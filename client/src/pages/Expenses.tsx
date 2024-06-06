import React, { ChangeEvent, useState } from 'react'
import Modal from '../components/Model'
import CustomInput from '../components/CustomInput'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { createTransaction } from '../services/transaction'

const Expenses: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const createMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess(data) {
      toast.success(data.message)
      setOpen(false)
      console.log(data)
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
      type: 'expense'
    })
  }

  return (
    <>
      <main className="px-8 mx-auto max-w-screen-2xl">
        <div className="my-8">
          <h1 className="text-2xl font-semibold">Expenses</h1>
        </div>
        <div>
          <button onClick={() => setOpen(true)} className="btn btn-outline btn-error">
            Add Expense
          </button>
        </div>
      </main>
      <Modal
        isLoading={createMutation.isPending}
        handleSubmit={handleFormSubmit}
        visible={open}
        onClose={() => setOpen(false)}
        title="Add Expense"
        text="Enter expense details"
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
              <option>Transport</option>
              <option>Grocery</option>
              <option>Gift/Reward</option>
              <option>Others</option>
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
    </>
  )
}
export default Expenses
