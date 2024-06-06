import { useMutation, useQuery } from '@tanstack/react-query'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { getUser, updateUser } from '../services/auth'
import Loader from '../components/Loader'
import { UserData } from '../types/UserData'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../context/userContext'

const Profile: React.FC = (): React.ReactElement => {
  const [mode, setMode] = useState<'read' | 'edit'>('read')
  const { setUser } = useContext(UserContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  })

  const [formData, setFormData] = useState<UserData>({
    monthlyBudget: 0,
    name: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess(data) {
      toast.success('User details updated successfully!')
      setFormData({
        name: data.data.name,
        monthlyBudget: data.data.monthlyBudget,
        password: ''
      })
      const newUserData = {
        _id: data.data._id,
        name: data.data.name,
        email: data.data.email
      }
      localStorage.setItem('buxtrack_user', JSON.stringify(newUserData))
      setUser({
        _id: data.data._id,
        name: data.data.name,
        email: data.data.email
      })
      setMode('read')
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

  const changeMode = () => {
    if (mode === 'edit') {
      setMode('read')
    } else {
      setMode('edit')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.name.trim().length < 6) {
      return toast.error('Name should be atleast 6 characters')
    } else if (isNaN(formData.monthlyBudget)) {
      return toast.error('Monthly budget is invalid')
    } else if (formData.monthlyBudget === 0) {
      return toast.error('Monthly Budget cannot be zero')
    } else if (formData.password !== '' && formData.password.trim().length < 8) {
      return toast.error('Password length should be atleast 8 characters')
    } else {
      if (formData.password === '') {
        updateMutation.mutate({
          name: formData.name,
          monthlyBudget: formData.monthlyBudget
        })
      } else {
        updateMutation.mutate(formData)
      }
    }
  }

  useEffect(() => {
    setFormData({
      name: data?.data.name || '',
      monthlyBudget: data?.data.monthlyBudget || 0,
      password: ''
    })
  }, [data])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <>Error fetching user details</>
  }

  return (
    <main className="relative px-8 mx-auto max-w-screen-2xl">
      <div className="mt-8 mb-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <p className="font-medium text-gray-600 ">Your profile details</p>
          <button className="btn btn-square btn-outline" onClick={changeMode}>
            {mode === 'edit' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col max-w-screen-sm gap-4 mt-6">
          <div>
            <label htmlFor="name">
              <span className="block mb-1 max-w-max">Name</span>
              <input
                className="w-full input input-bordered"
                id="name"
                name="name"
                value={formData.name}
                disabled={mode === 'read'}
                type="text"
                onChange={handleChange}
                autoComplete="off"
              />
            </label>
          </div>
          <div>
            <label htmlFor="mb">
              <span className="block mb-1 max-w-max">Monthly Budget</span>
              <input
                className="w-full input input-bordered"
                id="mb"
                name="monthlyBudget"
                value={formData.monthlyBudget}
                disabled={mode === 'read'}
                type="number"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <span className="block mb-1 max-w-max">Password</span>
              <input
                className="w-full input input-bordered"
                id="password"
                name="password"
                value={formData.password}
                disabled={mode === 'read'}
                type="password"
                onChange={handleChange}
                autoComplete="off"
                placeholder="Enter your new password"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-white btn btn-success"
            disabled={updateMutation.isPending || mode === 'read'}
          >
            {updateMutation.isPending ? <span className="loading loading-spinner"></span> : 'Save'}
          </button>
        </form>
      </div>
    </main>
  )
}
export default Profile
