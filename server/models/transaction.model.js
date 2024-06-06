import mongoose from 'mongoose'
const { Schema } = mongoose

const TransactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    paymentMethod: { type: String, required: true }
  },
  { timestamps: true }
)

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction
