import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from './../models/user.model.js'

// Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  let token

  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const user = await User.findById(decoded.userId).select('-password')
      req.user = user
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorised, Invalid Token!!!')
    }
  } else {
    res.status(401)
    throw new Error('Not Authorised, No Token!!!')
  }
})
