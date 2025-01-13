'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createAccountSchema } from '@/utils/schema-form-rules'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, getSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

type CreateAccountForm = z.infer<typeof createAccountSchema>

const months = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

export default function CreateAccount() {
  const form = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      surname: '',
      dateBirth: {
        day: '1',
        month: months[0].value,
        year: new Date().getFullYear().toString(),
      },
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: CreateAccountForm) => {
    const { password, email } = data
    toast(
      <div>
        <p>🦄 So easy</p>
        <p>usuário: {email}</p>
        <p>senha: {password}</p>
        <p>
          (Utilize o react-toastfy para exibir notificações para o usuario, não deixe o usuário
          realizar uma ação sem aparecer nada, obrigado!)
        </p>
      </div>
    )

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return
    }
    const session = await getSession()
    toast.success('Login efetuado com sucesso! :)', {
      position: 'bottom-center',
    })
    console.log(session)
  }
  return (
    <div className='py-12 h-dvh w-dvw flex items-center justify-center gap-5 bg-blue-50'>
      <div className='flex flex-col lg:flex-row items-center flex-wrap gap-6 max-w-[520px] bg-white p-10 rounded-r-lg border shadow-sm'>
        <div className='flex flex-col gap-2 border-b w-full pb-3 text-center'>
          <h1 className='text-2xl font-bold'>Crie uma conta</h1>
          <p className='text-gray-500'>É rápido e fácil!</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-6 gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='col-span-3'>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Digite seu nome' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='surname'
              render={({ field }) => (
                <FormItem className='col-span-3'>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder='Digite seu sobrenome' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              name='dateBirth.day'
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className='col-span-2'>
                    <SelectValue placeholder='Dia' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name='dateBirth.month'
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className='col-span-2'>
                    <SelectValue placeholder='Mês' defaultValue={months[0].value} />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name='dateBirth.year'
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className='col-span-2'>
                    <SelectValue placeholder='Ano' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => {
                      const year = new Date().getFullYear() - 10 + i
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='col-span-6'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Digite seu email' type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='col-span-6'>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder='Digite sua senha' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='outline' type='button' className='col-span-6 bg-green-500 text-white'>
              Enviar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
