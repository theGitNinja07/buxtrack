import { BaseResponse } from '../types/BaseResponse'
import api from './api'

type T = {
  date: Date
  amount: number
  type: string
  category: string
  paymentMethod: string
}

type Transaction = {
  _id: string
  user: string
  date: Date
  amount: number
  type: string
  category: string
  paymentMethod: string
}

const createTransaction = async (data: T) => {
  const res = await api.post<BaseResponse<Transaction>>('/transaction/create', data)
  return res.data
}

const getAllTransactions = async () => {
  const res = await api.get<BaseResponse<Array<Transaction>>>('/transaction')
  return res.data
}

const getLatestTransactions = async () => {
  const res = await api.get<BaseResponse<Array<Transaction>>>('/transaction/latest')
  return res.data
}

const deleteTransaction = async (id: string) => {
  const res = await api.delete('/transaction/' + id)
  return res.data
}

const getAllExpenses = async () => {
  const res = await api.get<BaseResponse<Array<Transaction>>>('/transaction/expenses')
  return res.data
}

const getAllIncomes = async () => {
  const res = await api.get<BaseResponse<Array<Transaction>>>('/transaction/incomes')
  return res.data
}

export {
  createTransaction,
  getAllExpenses,
  getAllIncomes,
  deleteTransaction,
  getAllTransactions,
  getLatestTransactions
}
