import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <Outlet />
      <Toaster />
    </>
  )
}
