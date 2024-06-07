import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import Loader from '../components/Loader'
import { UserContext } from '../context/userContext'
import { getAllTransactions, getLatestTransactions } from '../services/transaction'
import { format } from 'date-fns'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const Home: React.FC = (): React.ReactElement => {
  const { user } = useContext(UserContext)

  const {
    data,
    isLoading: loading,
    isError: err
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions
  })

  const allIncomes = data?.data.filter((x) => x.type === 'income')
  const allExpenses = data?.data.filter((x) => x.type === 'expense')

  const INCOME_CAT = ['Salary', 'Freelance', 'Gift/Reward']
  const EXPENSE_CAT = ['Transport', 'Grocery', 'Others', 'Gift/Reward']

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

  const netIncome = genIncomeRep().reduce((acc, t) => acc + t.income!, 0)
  const netExpense = genExpRep().reduce((acc, t) => acc + t.income!, 0)

  const dataGr = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Income Expense Chart',
        data: [netIncome, netExpense],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1
      }
    ]
  }

  const {
    data: latestData,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['latest'],
    queryFn: getLatestTransactions
  })

  if (isLoading || loading) {
    return <Loader />
  }

  if (isError || err) {
    return <>Errrr!!</>
  }

  return (
    <main className="px-8 mx-auto max-w-screen-2xl">
      <div className="my-8">
        <h1 className="text-2xl font-semibold">Hello there, {user?.name}</h1>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="w-full overflow-x-auto">
          <h2 className="mb-4 text-xl font-medium text-gray-500">Latest Transactions</h2>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {latestData?.data.map((transaction, idx) => (
                <tr key={transaction._id}>
                  <th>{idx + 1}</th>
                  <td>{format(new Date(transaction.date), 'dd-MMM-yyyy')}</td>
                  <td>{transaction.category}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.paymentMethod}</td>
                  <td>
                    {transaction.type === 'expense' ? (
                      <div className="gap-2 badge badge-error">Expense</div>
                    ) : (
                      <div className="gap-2 badge badge-success">Income</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid w-full text-center place-content-center">
          <Doughnut data={dataGr} />
        </div>
      </div>
    </main>
  )
}
export default Home
