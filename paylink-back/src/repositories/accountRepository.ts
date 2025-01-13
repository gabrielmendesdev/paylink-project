import { AccountDTO } from '../dto/accountDto'
import { Account } from '../models/accountModel'

async function findAccount(id: number): Promise<Account | null> {
  return await Account.findByPk(id)
}

async function listAccounts(): Promise<Account[]> {
  return await Account.findAll({order: [['createdAt', 'DESC']]})
}

async function createAccount(account: AccountDTO): Promise<Account> {
  return await Account.create({ ...account })
}

async function deleteAccount(id: number): Promise<void> {
    await Account.destroy({where: {id}})
}

export default {
  listAccounts,
  findAccount,
  createAccount,
  deleteAccount
}
