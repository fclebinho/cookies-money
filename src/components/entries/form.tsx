import { useEntriesContext } from '@/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  due_date: z.string(),
  amount: z.number(),
  description: z.string(),
  kind: z.number(),
})

type FormData = z.infer<typeof formSchema>

export const EntryForm = () => {
  const { insertEntry } = useEntriesContext()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const handleAdd = async (data: FormData) => {
    await insertEntry({
      due_date: data.due_date,
      amount: data.amount,
      description: data.description,
      kind: data.kind,
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleAdd)}>
        <label form="due_date">
          <input
            type="text"
            value="2023-02-22T20:59:51.535Z"
            {...register('due_date')}
          />
        </label>

        <label form="amount">
          <input
            type="number"
            value="123889"
            {...register('amount', { valueAsNumber: true })}
          />
        </label>

        <label form="description">
          <input
            type="text"
            value="Lançamento Manual"
            {...register('description')}
          />
        </label>

        <label form="kind">
          <input
            type="number"
            value="1"
            {...register('kind', { valueAsNumber: true })}
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          Adicionar
        </button>
      </form>
    </div>
  )
}
