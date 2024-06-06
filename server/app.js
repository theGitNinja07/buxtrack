import express from 'express'
import cors from 'cors'
import path from 'path'
import { errorHandler, notFound } from './middlewares/error.middleware.js'
import AuthRoutes from './routes/auth.routes.js'
import TransactionRoutes from './routes/transaction.routes.js'
import cookieParser from 'cookie-parser'

const corsOptions = {
  origin: 'http://localhost:3000'
}
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(cors(corsOptions))

app.get('/api/v1/hello', (req, res) => {
  res.json({ message: 'Hello, world!' })
})

app.get('/api/v1/test', (req, res) =>
  res.status(200).json({
    status: 'OK',
    message: 'JAI SHREE RAM',
    data: [
      { name: 'Vipul', age: 22 },
      { name: 'Rahul', age: 23 },
      { name: 'Nitesh', age: 27 },
      { name: 'Utkarsh', age: 21 },
      { name: 'Pushpit', age: 24 }
    ]
  })
)

app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/transaction', TransactionRoutes)

const location = path.resolve()
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'dev') {
  app.get('/', (req, res) => res.send('<h1>Welcome to the app.</h1>'))
} else {
  app.use(express.static(path.resolve(location, '../', 'client/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(location, '../', 'client', 'dist', 'index.html'))
  })
}

app.use(notFound)
app.use(errorHandler)

export default app
