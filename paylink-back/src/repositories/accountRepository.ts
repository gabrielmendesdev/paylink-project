import { AccountDTO } from '../dto/accountDto'
import { Account } from '../models/accountModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function findAccount(id: number): Promise<Account | null> {
  return await Account.findByPk(id)
}

async function loginAccount(email: string, password: string): Promise<{ user: Account; token: string } | null> {
  const account = await Account.findOne({ where: { email } })

  if (!account) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, account.password)

  if (!isPasswordValid) {
    return null
  }

  const accountWithoutPassword = account.toJSON()
  delete accountWithoutPassword.password
  
  const token = jwt.sign({ account: accountWithoutPassword }, process.env.SECRET!, {
    expiresIn: '2 days',
  })

  return {
    user: accountWithoutPassword,
    token: token,
  }
}

async function listAccounts(): Promise<Account[]> {
  return await Account.findAll({ order: [['createdAt', 'DESC']] })
}

async function createAccount(account: AccountDTO): Promise<Account> {
  return await Account.create({ ...account })
}

async function deleteAccount(id: number): Promise<void> {
  await Account.destroy({ where: { id } })
}

export default {
  listAccounts,
  findAccount,
  createAccount,
  deleteAccount,
  loginAccount,
}
