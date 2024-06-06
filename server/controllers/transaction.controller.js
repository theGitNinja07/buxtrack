import asyncHandler from 'express-async-handler'
import Transaction from './../models/transaction.model.js'
import User from './../models/user.model.js'

const createTransaction = asyncHandler(async (req, res) => {
  const { date, amount, type, category, paymentMethod } = req.body
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  } else {
    const transaction = await Transaction.create({
      user,
      date,
      amount,
      type,
      category,
      paymentMethod
    })

    const filteredTransaction = {
      _id: transaction._id,
      user: transaction.user._id,
      date: transaction.date,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      paymentMethod: transaction.paymentMethod,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    }

    if (transaction) {
      res.status(201).json({
        status: 'OK',
        message: 'transaction created successfully',
        data: filteredTransaction
      })
    } else {
      res.status(400)
      throw new Error('Invalid Data')
    }
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.comparePassword(password))) {
    genToken(res, user._id)

    res.status(200).json({
      status: 'OK',
      message: 'User login successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const getLoggedInUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.status(200).json({
      status: 'OK',
      message: 'User found successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        monthlyBudget: user.monthlyBudget
      }
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.monthlyBudget = req.body.monthlyBudget || user.monthlyBudget

    if (req.body.password) {
      user.password = req.body.password
    }

    if (req.body.monthlyBudget) {
      user.monthlyBudget = req.body.monthlyBudget
    }

    const updatedUser = await user.save()

    res.status(200).json({
      status: 'OK',
      message: 'User updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        monthlyBudget: updatedUser.monthlyBudget
      }
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { password } = req.body

  if (!user) {
    res.status(404)
    throw new Error('User Not Found')
  } else {
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      res.status(400)
      throw new Error('Incorrect password')
    } else {
      await User.findByIdAndDelete(req.userId)

      res.clearCookie('jwt')
      res.json({ message: 'User deleted successfully' })
    }
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0)
  })

  res.status(200).json({
    status: 'OK',
    message: 'Logged out successfully!',
    data: null
  })
})

export { createTransaction }
