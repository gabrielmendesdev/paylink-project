import { Sequelize } from 'sequelize-typescript'
import { Account } from '../models/accountModel'
import { Agency } from '../models/agencyModel'

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD

export const sequelize = new Sequelize(dbName!, dbUser!, dbPassword!, {
  dialect: 'mysql',
  host: dbHost,
  models: [Account, Agency],
})

export default sequelize