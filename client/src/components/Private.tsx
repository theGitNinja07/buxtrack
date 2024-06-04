import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from './../context/userContext'
import Loader from './Loader'

const Private: React.FC = () => {
  const { user, loading } = useContext(UserContext)

  if (loading) {
    return <Loader />
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
export default Private
