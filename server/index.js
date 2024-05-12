import express from 'express'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
const PORT = process.env.NODE_PORT || 5000
const corsOptions = {
  origin: 'http://localhost:3000'
}
const app = express()

app.use(express.json())
app.use(cors(corsOptions))

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

app.listen(PORT, () => console.log(colors.green.bold.underline('Server is running...')))
