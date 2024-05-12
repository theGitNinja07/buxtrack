import { format } from 'date-fns'
import React from 'react'

type IncomeProps = {}

const Income: React.FC<IncomeProps> = () => {
  return (
    <main className="relative px-8 mx-auto max-w-screen-2xl">
      <div className="my-8">
        <h1 className="text-2xl font-semibold">Income</h1>
      </div>
      <div>
        <button className="btn btn-outline btn-success">Add Income</button>
      </div>
      <div className="my-8">
        <div className="overflow-x-auto">
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
              {Array.from({ length: 10 }).map((_, idx) => {
                return (
                  <>
                    <tr>
                      <th>{idx + 1}</th>
                      <td>{format(new Date(), 'dd-MMM-yyyy')}</td>
                      <td>Category</td>
                      <td>${(idx + 1) * 100}</td>
                      <td>{idx % 2 === 0 ? 'Cash' : 'Bank Transfer'}</td>
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
                        <button className="btn btn-outline btn-error">
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
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
export default Income