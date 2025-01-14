import { LoginResponse } from '@/service/account/AccountModel'
import { AccountService } from '@/service/account/AccountService'
import { AuthUser } from '@/service/user/UserService'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const loginAuthentication = async (email: string, password: string): Promise<LoginResponse> => {
          try {
            const response = await AccountService.Login(email, password)
            return response
          } catch (error) {
            console.error('Erro ao autenticar:', error)
            throw new Error('Credenciais inválidas')
          }
        }

        try {
          const response = await loginAuthentication(credentials.email, credentials.password)

          if (!response || !response.user) {
            return null
          }

          const { token, user } = response

          const userAuthenticated: AuthUser = {
            id: user.id.toString(),
            name: user.name,
            surname: user.surname,
            dateBirth: user.dateBirth,
            profession: user.profession,
            email: user.email,
            token: token,
          }

          return userAuthenticated
        } catch (error) {
          console.error(`Erro ao realizar o login: ${error}`)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as AuthUser
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user as AuthUser
      return session
    },
  },
}
