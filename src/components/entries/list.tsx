import { useEntriesContext } from '@/providers'
import { useEffect } from 'react'

export const ListEntries = () => {
  const { entries, listEntries } = useEntriesContext()

  useEffect(() => {
    listEntries()
  }, [])

  return (
    <div>
      {entries.map((entry, index) => (
        <div key={index}>
          {entry.description} {entry.amount} {entry.owner ? 'Meu' : 'Não é meu'}
        </div>
      ))}
    </div>
  )
}
