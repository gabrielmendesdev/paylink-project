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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { loginSchema } from '@/utils/schema-form-rules'
import { useRouter } from 'next/navigation'

type LoginForm = z.infer<typeof loginSchema>

export default function Home() {
  const router = useRouter()

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginForm) => {
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
    <div className='py-12 h-dvh :w-[100dvw] flex items-center justify-center gap-5 bg-blue-50'>
      <div className='flex flex-col lg:flex-row items-center flex-wrap gap-6 bg-white p-10 rounded-r-lg border shadow-sm'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 grid'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder='Digite sua senha' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href={'#'} className='text-blue-500 text-[0.8em]'>
              Esqueci a senha
            </Link>
            <Button type='submit' className='bg-blue-500'>
              Entrar
            </Button>
            <Button variant='outline' type='button' onClick={() => router.push('/new-account')}>
              Criar uma conta
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
