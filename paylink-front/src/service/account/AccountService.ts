import api from '../api'
import { CreateAccount, Account, LoginResponse } from './AccountModel'

export const AccountService = {
  Login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const data = {
        email,
        password,
      }
      const response = await api.post<LoginResponse>('/login', data)
      return response.data
    } catch (error) {
      throw new Error(`Credenciais inválidas ${error}`)
    }
  },
  GetAccounts: async (): Promise<Account[]> => {
    try {
      const response = await api.get<Account[]>('/accounts')
      return response.data
    } catch (error) {
      throw new Error(`Não foi possível encontrar os Accounts: ${error}`)
    }
  },

  GetAccountById: async (id: number): Promise<Account> => {
    try {
      const response = await api.get<Account>(`/accounts/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Não foi possível encontrar os Accounts: ${error}`)
    }
  },

  CreateAccount: async (account: CreateAccount): Promise<Account> => {
    try {
      const response = await api.post<Account>('/register', account)
      return response.data
    } catch (error) {
      throw new Error(`Não foi possível encontrar os Accounts: ${error}`)
    }
  },

  DeleteAccount: async (id: number): Promise<void> => {
    try {
      await api.delete<Account>(`/accounts/${id}`)
    } catch (error) {
      throw new Error(`Não foi possível encontrar os Accounts: ${error}`)
    }
  },
}
