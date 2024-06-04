import api from '../services/api'
import { BaseResponse } from '../types/BaseResponse'
import { UserData } from '../types/UserData'
import type { FormFieldType as RegisterData } from './../pages/Register'
import type { FormFieldType as LoginData } from './../pages/Login'

const registerUser = async (data: RegisterData) => {
  const res = await api.post<BaseResponse<{ _id: string; name: string; email: string }>>('/auth/register', data)
  return res.data
}

const loginUser = async (data: LoginData) => {
  const res = await api.post('/auth/login', data)
  return res.data
}

const getUser = async () => {
  const res = await api.get('/auth/profile')
  return res.data
}

const logoutUser = async () => {
  const res = await api.get('/auth/logout')
  return res.data
}

const updateUser = async (data: UserData) => {
  const res = await api.put('/auth/profile', data)
  return res.data
}

const deleteUser = async () => {
  const res = await api.put('/auth/profile')
  return res.data
}

export { registerUser, getUser, loginUser, logoutUser, updateUser, deleteUser }