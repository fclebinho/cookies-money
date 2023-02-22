import React, { FC, useContext } from 'react'
import { useUserId } from '@nhost/nextjs'
import { gql, useQuery } from '@apollo/client'

const GET_USER_QUERY = gql`
  query GetUser($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      metadata
      avatarUrl
    }
  }
`

export type User = {
  avatarUrl: string
  displayName: string
  email: string
  metadata: {
    firstName: string
    lastName: string
  }
}

export interface UserContextProps {
  user?: User
}

const UserContext = React.createContext<UserContextProps>({})

export interface UserProviderProps {
  children?: React.ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children = null }) => {
  const id = useUserId()

  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id,
  })
  const user = data?.user

  if (error) {
    return <p>Something went wrong. Try to refresh the page.</p>
  }

  if (loading) {
    return null
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
