import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import isValidEmail from '../utils/validateEmail'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../services/auth'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { UserContext } from '../context/userContext'

export type FormFieldType = {
  email: string
  password: string
}

type ErrorObjType = {
  email: string | null
  password: string | null
}

const Login: React.FC = (): React.ReactElement => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState<FormFieldType>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<ErrorObjType>({
    email: null,
    password: null
  })

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess(data) {
      localStorage.setItem('buxtrack_user', JSON.stringify(data.data))
      setUser(data.data)
      toast.success('User registered successfully!')
      navigate('/')
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        console.log(error)
      }
    }
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.email.trim().length === 0 || !isValidEmail(formData.email)) {
      setError({
        password: null,
        email: 'Please enter a valid email'
      })
    } else if (formData.password.trim().length < 8) {
      setError({
        email: null,
        password: 'Password should be atleast 8 characters'
      })
    } else {
      setError({ email: null, password: null })
      loginMutation.mutate(formData)
    }
  }

  return (
    <div className="max-w-screen-sm px-6 mx-auto my-8">
      <h1 className="text-3xl font-bold">Login</h1>
      <h2 className="my-3 text-xl font-semibold text-gray-500">Enter your credentials</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <span className="block mb-1 max-w-max">Email</span>
            <input
              id="email"
              type="email"
              className="w-full input input-bordered"
              onChange={handleChange}
              name="email"
              autoComplete="off"
              placeholder="johndoe@example.com"
              value={formData.email}
            />
          </label>
          {error.email && (
            <p className="flex gap-1 mt-2 text-sm text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>

              <span className="leading-3">{error.email}</span>
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">
            <span className="block mb-1 max-w-max">Password</span>
            <input
              id="password"
              type="password"
              className="w-full input input-bordered"
              onChange={handleChange}
              name="password"
              autoComplete="off"
              placeholder="********"
              value={formData.password}
            />
          </label>
          {error.password && (
            <p className="flex gap-1 mt-2 text-sm text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>

              <span className="leading-3">{error.password}</span>
            </p>
          )}
        </div>
        <button type="submit" className="w-full text-white btn btn-success" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? <span className="loading loading-spinner"></span> : 'Login'}
        </button>
      </form>
      <p className="mt-3">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-blue-700 underline">
          Create One
        </Link>
      </p>
    </div>
  )
}

export default Login
