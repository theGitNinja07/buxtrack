import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import Loader from '../components/Loader'
import { UserContext } from '../context/userContext'
import { getLatestTransactions } from '../services/transaction'

const Home: React.FC = (): React.ReactElement => {
  const { user } = useContext(UserContext)

  const { data, isError, isLoading } = useQuery({
    queryKey: ['latest'],
    queryFn: getLatestTransactions
  })

  console.log(data?.data)

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <>Errrr!!</>
  }

  return (
    <main className="px-8 mx-auto max-w-screen-2xl">
      <div className="my-8">
        <h1 className="text-2xl font-semibold">Hello, {user?.name}</h1>
      </div>
      <div>
        {data?.data.map((item, idx) => {
          return (
            <div key={idx}>
              {item.category} - {item.amount}
            </div>
          )
        })}
        this is the new code
      </div>
    </main>
  )
}
export default Home
