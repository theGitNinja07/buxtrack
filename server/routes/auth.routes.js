import { protect } from '../middlewares/auth.middleware.js'
import {
  deleteUser,
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserDetails
} from './../controllers/auth.controller.js'
import express from 'express'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/profile').get(protect, getLoggedInUser).put(protect, updateUserDetails).delete(protect, deleteUser)

export default router
