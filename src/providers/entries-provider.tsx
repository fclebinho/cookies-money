import { useUserId } from '@nhost/nextjs'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { createContext, FC, ReactNode, useContext, useState } from 'react'

const INSERT_ENTRY_MUTATION = gql`
  mutation PutEntry($input: entries_insert_input!) {
    insert_entries_one(object: $input) {
      id
    }
  }
`

const INSERT_ENTRY_USER_MUTATION = gql`
  mutation PutUserEntry($input: users_entries_insert_input!) {
    insert_users_entries_one(object: $input) {
      id
    }
  }
`

const GET_ENTRIES_QUERY = gql`
  query GetEntries($id: uuid!) {
    entries(where: { users_entries: { user_id: { _eq: $id } } }) {
      id
      amount
      description
      due_date
      kind
      user_id
    }
  }
`

export type Entry = {
  id?: string
  amount: number
  description?: string
  due_date: string
  kind: number
  owner?: boolean
  user_id?: string
}

export type EntryUser = {
  id?: string
  entry_id?: string
  user_id?: string
}

export interface EntriesContextProps {
  entries: Entry[]
  insertEntry: (input: Entry) => Promise<void>
  listEntries: () => Promise<void | ReactNode>
}

const EntriesContext = createContext<EntriesContextProps>(
  {} as EntriesContextProps,
)

export interface EntriesProviderProps {
  children?: ReactNode
}

export const EntriesProvider: FC<EntriesProviderProps> = ({
  children = null,
}) => {
  const [entries, setEntries] = useState<Entry[]>([])
  const id = useUserId()
  const mutationUser = useMutation(INSERT_ENTRY_MUTATION)
  const mutationEntryUser = useMutation(INSERT_ENTRY_USER_MUTATION)
  const query = useLazyQuery(GET_ENTRIES_QUERY)

  const insertEntry = async (input: Entry) => {
    const [insert] = mutationUser

    await insert({ variables: { input: { ...input, user_id: id } } })
      .then(({ data }) => {
        const entry_id = data?.insert_entries_one?.id
        insertEntryUser({ user_id: id, entry_id })
        setEntries((_entries) => [
          ..._entries,
          { ...input, id: entry_id, owner: true },
        ])
      })
      .catch((_) => null)
  }

  const insertEntryUser = async (input: EntryUser) => {
    const [insert] = mutationEntryUser

    await insert({ variables: { input } }).catch((err) => {
      throw new Error(err)
    })
  }

  const listEntries = async () => {
    const [getEntries] = query

    return await getEntries({ variables: { id } })
      .then(({ data }) => {
        setEntries(
          data?.entries.map((entry: any) => ({
            ...entry,
            amount: entry.amount / 100,
            owner: entry.user_id === id,
          })),
        )
      })
      .catch((_) => {
        return <p>Something went wrong. Try to refresh the page.</p>
      })
  }

  return (
    <EntriesContext.Provider value={{ entries, insertEntry, listEntries }}>
      {children}
    </EntriesContext.Provider>
  )
}

export function useEntriesContext() {
  return useContext(EntriesContext)
}
