import AccountRepository from '../repositories/accountRepository'
import { BadRequestException, NotFoundException } from '../exceptions/apiExceptions'
import { AccountDTO } from '../dto/accountDto'

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
    console.log(account)
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

    return await AccountRepository.createAccount(account)
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
}
