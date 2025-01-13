import { z } from 'zod'

export const createAccountSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  surname: z.string().min(1, 'O nome é obrigatório'),
  dateBirth: z.object({
    day: z.string().min(1, 'O dia é obrigatório'),
    month: z.string().min(1, 'O mês é obrigatório'),
    year: z.string().min(1, 'O ano é obrigatório'),
  }),
  profession: z.string().min(1, 'O cargo é obrigatório'),
  email: z.string().min(1, 'O email é obrigatório'),
  password: z.string().min(2, 'A senha é obrigatório'),
})
