import React from 'react'

type ExpensesProps = {}

const Expenses: React.FC<ExpensesProps> = () => {
  return (
    <main className="max-w-screen-2xl mx-auto px-8">
      <div className="my-8">
        <h1 className="text-2xl font-semibold">Expenses</h1>
      </div>
      <div>
        <button className="btn btn-outline btn-error">Add Expense</button>
      </div>
    </main>
  )
}
export default Expenses
