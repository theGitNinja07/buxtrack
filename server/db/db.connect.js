import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async (DB_URI) => {
  try {
    const res = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(colors.green('MONGO DB connection successful, HOST: ') + res.connection.host)
  } catch (err) {
    console.error(colors.red('Failed to connect to MongoDB'), err)
    process.exit(1)
  }
}

export default connectDB
