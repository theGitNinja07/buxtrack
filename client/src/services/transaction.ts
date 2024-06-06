import { BaseResponse } from '../types/BaseResponse'
import api from './api'

type T = {
  date: Date
  amount: number
  type: string
  category: string
  paymentMethod: string
}

const createTransaction = async (data: T) => {
  const res = await api.post<
    BaseResponse<{
      user: string
      date: Date
      amount: number
      type: string
      category: string
      paymentMethod: string
    }>
  >('/transaction/create', data)
  return res.data
}

export { createTransaction }
