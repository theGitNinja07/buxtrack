import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import App from '../App'

import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import Income from '../pages/Income'
import Expenses from '../pages/Expenses'
import Report from '../pages/Report'
import Login from '../pages/Login'
import Register from '../pages/Register'

import Private from '../components/Private'
import Profile from '../pages/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Private />}>
        <Route index element={<Home />} />
        <Route path="income" element={<Income />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="report" element={<Report />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default router
