import api from '../api'
import { CreateAccount, Account } from './AccountModel'

export const AccountService = {
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
      const response = await api.post<Account>('/', account)
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
