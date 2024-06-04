import asyncHandler from 'express-async-handler'
import { genToken } from '../utils/genToken.js'
import User from './../models/user.model.js'

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists) {
    res.status(400)
    throw new Error('Email already exists!')
  } else {
    const user = await User.create({
      name,
      email,
      password
    })

    if (user) {
      genToken(res, user._id)

      res.status(201).json({
        status: 'OK',
        message: 'User created successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      })
    } else {
      res.status(400)
      throw new Error('Invalid User Data')
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
        email: user.email
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

export { deleteUser, getLoggedInUser, loginUser, logoutUser, registerUser, updateUserDetails }
