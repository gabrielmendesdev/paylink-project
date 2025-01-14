import AccountRepository from '../repositories/accountRepository'
import { BadRequestException, NotFoundException } from '../exceptions/apiExceptions'
import { AccountDTO } from '../dto/accountDto'
import bcrypt from 'bcrypt';

const findAccount = async (id: number) => {
  try {
    const existentPost = await AccountRepository.findAccount(id)

    if (!existentPost) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return existentPost
  } catch (error) {
    console.error(error)
    throw error
  }
}

const loginAccount = async (email: string, password: string) => {
  try {
    const account = await AccountRepository.loginAccount(email, password)

    if (!account) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return account
  } catch (error) {
    console.error(error)
    throw error
  }
}

const listAccounts = async () => {
  try {
    return await AccountRepository.listAccounts()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const createNewAccount = async (account: AccountDTO) => {
  try {
    
    if (!account.name) {
      throw new BadRequestException('Nome é um campo obrigatório')
    }
    if (!account.surname) {
      throw new BadRequestException('Sobrenome é um campo obrigatório')
    }
    if (!account.profession) {
      throw new BadRequestException('Cargo é um campo obrigatório')
    }
    if (!account.dateBirth) {
      throw new BadRequestException('Data de nascimento é um campo obrigatório')
    }
    if (!account.password) {
      throw new BadRequestException('Senha é um campo obrigatório')
    }

    const hashedPassword = await bcrypt.hash(account.password, 10);

    const newAccount = {
      ...account,
      password: hashedPassword,
    };

    return await AccountRepository.createAccount(newAccount)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const deleteAccount = async (id: number) => {
  try {
    const existentAccount = await AccountRepository.findAccount(id)

    if (!existentAccount) {
      throw new NotFoundException('Agencia não encontrado')
    }

    return await AccountRepository.deleteAccount(id)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  findAccount,
  listAccounts,
  createNewAccount,
  deleteAccount,
  loginAccount,
}
