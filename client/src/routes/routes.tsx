import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import App from '../App'

import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import Income from '../pages/Income'
import Expenses from '../pages/Expenses'
import Report from '../pages/Report'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/report" element={<Report />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default router
