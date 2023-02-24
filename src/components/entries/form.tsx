import { useEntriesContext } from '@/providers'
import { Box, Button, Text, TextInput } from '@cookies-ui/react'
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
    defaultValues: {
      due_date: '2023-02-22T20:59:51.535Z',
      amount: 123889,
      description: 'Lançamento Manual',
      kind: 1,
    },
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
    <Box>
      <form onSubmit={handleSubmit(handleAdd)}>
        <label form="due_date">
          <Text size="sm">Vencimento</Text>
          <TextInput type="text" {...register('due_date')} />
        </label>

        <label form="amount">
          <Text size="sm">Valor R$</Text>
          <TextInput
            type="number"
            {...register('amount', { valueAsNumber: true })}
          />
        </label>

        <label form="description">
          <Text size="sm">Descrição</Text>
          <TextInput type="text" {...register('description')} />
        </label>

        <label form="kind">
          <Text size="sm">Tipo</Text>
          <TextInput
            type="number"
            {...register('kind', { valueAsNumber: true })}
          />
        </label>

        <Button type="submit" size="large" disabled={isSubmitting}>
          Adicionar
        </Button>
      </form>
    </Box>
  )
}
