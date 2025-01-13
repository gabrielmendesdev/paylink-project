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
import { Spinner } from '@/components/ui/spinner'
import { CreateAccount } from '@/service/account/AccountModel'
import { AccountService } from '@/service/account/AccountService'
import { createAccountSchema } from '@/utils/schema-form-rules'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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

export default function CreateAccountPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

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

  const onCreateAccount = async (data: CreateAccountForm) => {
    const { name, surname, dateBirth, profession, email, password } = data

    const formattedDateBirth = `${dateBirth.day.padStart(2, '0')}-${dateBirth.month.padStart(2, '0')}-${dateBirth.year}`

    console.log(formattedDateBirth)

    const account: CreateAccount = {
      name,
      surname,
      dateBirth: formattedDateBirth,
      profession,
      email,
      password,
    }
    createAccount(account)
  }

  const createAccount = async (account: CreateAccount): Promise<void> => {
    setIsLoading(true)
    try {
      await AccountService.CreateAccount(account)
      toast.success('Conta criada com sucesso!', {position: 'top-center'})
      router.push('/')
    } catch (error) {
      console.log(error)
      toast.error('Falha ao criar a conta, tente novamente mais tarde ou contate um administrador.')
      throw new Error()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='py-12 h-dvh w-dvw flex items-center justify-center gap-5 bg-blue-50'>
      <div className='flex flex-col lg:flex-row items-center flex-wrap gap-6 max-w-[520px] bg-white p-10 rounded-r-lg border shadow-sm'>
        <div className='flex flex-col gap-2 border-b w-full pb-3 text-center'>
          <h1 className='text-2xl font-bold'>Crie uma conta</h1>
          <p className='text-gray-500'>É rápido e fácil!</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreateAccount)} className='grid grid-cols-6 gap-4'>
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
                    {Array.from({ length: 112 }, (_, i) => {
                      const year = new Date().getFullYear() - 111 + i
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
              name='profession'
              render={({ field }) => (
                <FormItem className='col-span-6'>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder='Digite seu cargo' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
            {isLoading ? (
              <Button
                variant='outline'
                type='submit'
                className='col-span-6 bg-green-500 hover:bg-green-400 hover:text-white text-white'
              >
                <Spinner />
              </Button>
            ) : (
              <Button
                variant='outline'
                type='submit'
                className='col-span-6 bg-green-500 hover:bg-green-400 hover:text-white text-white'
              >
                Enviar
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}
