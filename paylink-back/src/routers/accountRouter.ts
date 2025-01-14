import express from 'express'
import accountController from '../controllers/accountController'
import { auth } from '../middlewares/auth'

const routes = express.Router()

routes.get('/', auth, accountController.getAccount)
routes.get('/:id', auth, accountController.findAccountById)
routes.post('/login', accountController.loginAccount)
routes.post('/register', accountController.createAccount)

export { routes as default }
