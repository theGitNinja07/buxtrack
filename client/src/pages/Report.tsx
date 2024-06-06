import { useQuery } from '@tanstack/react-query'
import React, { useContext, useRef } from 'react'
import { getAllTransactions } from '../services/transaction'
import Loader from '../components/Loader'
import { UserContext } from '../context/userContext'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas-pro'
import { format } from 'date-fns'

const Report: React.FC = () => {
  const { user } = useContext(UserContext)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions
  })

  const allIncomes = data?.data.filter((x) => x.type === 'income')
  const allExpenses = data?.data.filter((x) => x.type === 'expense')

  const INCOME_CAT = ['Salary', 'Freelance', 'Gift/Reward']
  const EXPENSE_CAT = ['Transport', 'Grocery', 'Others', 'Gift/Reward']

  const componentRef = useRef<HTMLDivElement | null>(null)

  const generatePDF = async () => {
    if (componentRef.current) {
      const canvas = await html2canvas(componentRef.current)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      const imgWidth = 190
      const pageHeight = pdf.internal.pageSize.height
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 10

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`report-${format(new Date(), 'dd-MMM-yyyy')}.pdf`)
    }
  }

  const genIncomeRep = () => {
    return INCOME_CAT.map((cat) => {
      return {
        category: cat,
        income: allIncomes?.filter((income) => income.category === cat).reduce((curr, tr) => curr + tr.amount, 0)
      }
    })
  }

  const genExpRep = () => {
    return EXPENSE_CAT.map((cat) => {
      return {
        category: cat,
        income: allExpenses?.filter((exp) => exp.category === cat).reduce((curr, tr) => curr + tr.amount, 0)
      }
    })
  }

  const genNetBalance = () => {
    const netIncome = genIncomeRep().reduce((acc, t) => acc + t.income!, 0)
    const netExpense = genExpRep().reduce((acc, t) => acc + t.income!, 0)

    return netIncome - netExpense
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <>Err</>
  }

  return (
    <main className="px-8 mx-auto max-w-screen-2xl">
      <div className="flex items-center justify-between gap-3 mt-12 mb-4 btn-accent">
        <h1 className="text-2xl font-bold">Hello, {user?.name}</h1>
        <button onClick={generatePDF} className="btn">
          Download Report
        </button>
      </div>
      <div
        ref={componentRef}
        className="w-full max-w-screen-md p-5 mx-auto mb-4 shadow-xl card bg-base-100"
        id="divToPrint"
      >
        <h1 className="mb-3 text-2xl font-bold">Income/Expense Report</h1>
        <p className="font-medium text-gray-600 ">Generated on: {new Date().toDateString()}</p>

        <div className="flex flex-col gap-3 mt-5">
          <div>
            <h2 className="mb-2 text-lg font-semibold">Incomes</h2>
            <div className="mt-2">
              <div className="flex items-center p-2 font-semibold rounded justify-evenly bg-slate-100">
                <span>Category</span>
                <span>Amount</span>
              </div>

              <div className="mt-3">
                {genIncomeRep().map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex items-center p-2 text-sm bg-green-100 border-b border-green-500 rounded justify-evenly"
                    >
                      <span>{item.category}</span>
                      <span>${item.income}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Expenses</h2>
            <div className="mt-2">
              <div className="flex items-center p-2 font-semibold rounded justify-evenly bg-slate-100">
                <span>Category</span>
                <span>Amount</span>
              </div>

              <div className="mt-3">
                {genExpRep().map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex items-center p-2 text-sm bg-red-100 border-b border-red-500 rounded justify-evenly"
                    >
                      <span>{item.category}</span>
                      <span>${item.income}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full max-w-screen-md p-5 text-center font-extrabold ${
            genNetBalance() < 0 ? 'bg-red-400' : 'bg-green-400'
          }`}
        >
          Net Balance: ${Math.abs(genNetBalance())}
        </div>
      </div>
    </main>
  )
}
export default Report
