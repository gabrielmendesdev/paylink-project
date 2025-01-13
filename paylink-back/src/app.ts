import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import agencyRouter from './routers/agencyRouter'
import sequelize from './database/db'
import { handleErrorMiddleware } from './middlewares/handleError'
import accountRouter from './routers/accountRouter'

const app = express()
sequelize.authenticate()

app.use(morgan('tiny'))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/api/agency', agencyRouter)
app.use('/api/account', accountRouter)

app.use(handleErrorMiddleware)

export default app
