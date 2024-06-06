import { protect } from '../middlewares/auth.middleware.js'
import { createTransaction } from './../controllers/transaction.controller.js'
import express from 'express'

const router = express.Router()

router.route('/create').post(protect, createTransaction)
// router.route('/login').post(loginUser)
// router.route('/logout').post(logoutUser)
// router.route('/profile').get(protect, getLoggedInUser).put(protect, updateUserDetails).delete(protect, deleteUser)

export default router
