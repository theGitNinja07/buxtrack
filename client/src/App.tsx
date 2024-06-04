import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import UserContextProvider from './context/userContext'

export default function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Outlet />
      <Toaster />
    </UserContextProvider>
  )
}
