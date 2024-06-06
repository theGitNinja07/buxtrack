import { format } from 'date-fns'
import React, { ChangeEvent, useState } from 'react'
import Modal from '../components/Model'
import CustomInput from '../components/CustomInput'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTransaction, deleteTransaction, getAllIncomes } from '../services/transaction'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import Loader from '../components/Loader'

const Income: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['incomes'],
    queryFn: getAllIncomes
  })

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess(data) {
      toast.success(data.message)
      queryClient.invalidateQueries()
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        console.log('transaction not created!')
        console.log(error)
      }
    }
  })

  const createMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess(data) {
      toast.success(data.message)
      setOpen(false)
      queryClient.invalidateQueries()
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        console.log('transaction not created!')
        console.log(error)
      }
    }
  })

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value)
    if (!isNaN(newValue) && newValue >= 0) {
      setAmount(newValue)
    }
  }

  const handleFormSubmit = () => {
    createMutation.mutate({
      date,
      amount,
      category,
      paymentMethod,
      type: 'income'
    })
  }

  if (isError) {
    return <>Error fetching incomes</>
  }

  return (
    <React.Fragment>
      <main className="relative px-8 mx-auto max-w-screen-2xl">
        <div className="my-8">
          <h1 className="text-2xl font-semibold">Income</h1>
        </div>
        <div>
          <button onClick={() => setOpen(true)} className="btn btn-outline btn-success">
            Add Income
          </button>
        </div>
        <div className="my-8">
          <div className="overflow-x-auto">
            {isLoading ? (
              <Loader />
            ) : (
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((income, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <tr>
                          <th>{idx + 1}</th>
                          <td>{format(new Date(income.date), 'dd-MMM-yyyy')}</td>
                          <td>{income.category}</td>
                          <td>${income.amount}</td>
                          <td>{income.paymentMethod}</td>
                          <td className="flex items-center gap-3">
                            <button className="btn btn-outline btn-success">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                />
                              </svg>
                            </button>
                            <button
                              disabled={deleteMutation.isPending}
                              onClick={() => deleteMutation.mutate(income._id)}
                              className="btn btn-outline btn-error"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <Modal
        isLoading={createMutation.isPending}
        handleSubmit={handleFormSubmit}
        visible={open}
        onClose={() => setOpen(false)}
        title="Add Income"
        text="Enter income details"
      >
        <div className="flex flex-col gap-2">
          <CustomInput
            type="date"
            connect="date"
            label="Date"
            error=""
            value={date.toISOString().split('T')[0]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value))}
          />
          <CustomInput
            type="number"
            connect="amount"
            label="Amount"
            error=""
            value={amount}
            onChange={handleNumberChange}
          />
          <label className="w-full max-w-full form-control">
            <div className="label">
              <span>Category</span>
            </div>
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
              className="select select-bordered"
            >
              <option disabled selected>
                Pick one
              </option>
              <option>Salary</option>
              <option>Freelance</option>
              <option>Gift/Reward</option>
            </select>
          </label>
          <label className="w-full max-w-full form-control">
            <div className="label">
              <span>Payment Method</span>
            </div>
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setPaymentMethod(e.target.value)}
              className="select select-bordered"
            >
              <option disabled selected>
                Pick one
              </option>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>UPI</option>
            </select>
          </label>
        </div>
      </Modal>
    </React.Fragment>
  )
}
export default Income
