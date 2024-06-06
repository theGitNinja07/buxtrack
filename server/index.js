import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './db/db.connect.js'
import app from './app.js'

dotenv.config()
const PORT = process.env.NODE_PORT || 5000
const DB_USER = process.env.DB_USER
const DB_KEY = process.env.DB_KEY
const DB_URI = process.env.DB_URI.replace('%USER%', DB_USER).replace('%KEY%', DB_KEY)

await connectDB(DB_URI)

app.listen(PORT, () => console.log(colors.green.bold.underline('Server is running...')))
