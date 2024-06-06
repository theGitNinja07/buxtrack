import { protect } from '../middlewares/auth.middleware.js'
import {
  createTransaction,
  getAllExpenses,
  getAllIncomes,
  getTransaction,
  removeTransaction,
  updateTransaction
} from './../controllers/transaction.controller.js'
import express from 'express'

const router = express.Router()

router.route('/create').post(protect, createTransaction)
router.route('/incomes').get(protect, getAllIncomes)
router.route('/expenses').get(protect, getAllExpenses)
router.route('/:id').get(protect, getTransaction).put(protect, updateTransaction).delete(protect, removeTransaction)

export default router
