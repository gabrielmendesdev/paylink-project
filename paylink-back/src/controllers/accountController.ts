import { Request, Response, NextFunction } from 'express'
import accountService from '../service/accountService'

async function getAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const Account = await accountService.listAccounts()
    res.json(Account)
  } catch (err) {
    next(err)
  }
}

async function findAccountById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const account = await accountService.findAccount(id as unknown as number)
    res.json(account)
  } catch (err) {
    next(err)
  }
}

async function createAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, surname, dateBirth, profession, email, password } = req.body
    const newAccount = await accountService.createNewAccount({
      name,
      surname,
      dateBirth,
      profession,
      email,
      password
    })
    res.status(201).json(newAccount)
  } catch(err) {
    next(err)
  } 
}

async function loginAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const Account = await accountService.loginAccount(req.body.email, req.body.password)
    res.json(Account)
  } catch (err) {
    next(err)
  }
}

export default {
  getAccount,
  findAccountById,
  createAccount,
  loginAccount
}
