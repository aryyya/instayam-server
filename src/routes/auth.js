const { Router } = require('express')
const { getAuthToken } = require('../utility')
const {
  compare,
  hash
} = require('bcrypt')
const { User } = require('../models')
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED
} = require('http-status')
const { ValidationError } = require('sequelize')

const router = Router()

router.post('/login', async (request, response) => {
  try {
    const {
      username,
      password
    } = request.body
  
    if (!username || !password) {
      throw 'MISSING_PARAMETERS'
    }

    const user = await User.findOne({
      where: {
        username
      }
    })

    if (!user) {
      throw 'USER_NOT_FOUND'
    }

    if (!await compare(password, user.password_hash)) {
      throw 'INVALID_CREDENTIALS'
    }

    const authToken = getAuthToken({
      id: user.id,
      username: user.username
    })

    response
      .status(OK)
      .send({
        authToken
      })
  }

  catch (error) {
    if (error === 'MISSING_PARAMETERS') {
      response
        .status(BAD_REQUEST)
        .send('required parameters: username, password')
    }

    else if (error === 'INVALID_CREDENTIALS' || error === 'USER_NOT_FOUND') {
      response
        .status(UNAUTHORIZED)
        .send('invalid credentials')
    }

    else throw error
  }
})

router.post('/sign-up', async (request, response) => {
  try {
    const {
      email,
      username,
      password,
      fullName
    } = request.body

    if (!email || !username || !password || !fullName) {
      throw 'MISSING_PARAMETERS'
    }

    if (password.length < 8 || password.length > 64) {
      throw 'INVALID_PASSWORD_LENGTH'
    }

    const password_hash = await hash(password, 10)

    const user = await User.create({
      email,
      username,
      password_hash,
      full_name: fullName
    })

    const authToken = getAuthToken({
      id: user.id,
      username: user.username
    })

    response
      .status(OK)
      .send({
        authToken
      })
  }
  catch (error) {
    if (error === 'MISSING_PARAMETERS') {
      response
        .status(BAD_REQUEST)
        .send('required parameters: email, username, password, fullName')
    }

    else if (error === 'INVALID_PASSWORD_LENGTH') {
      response
        .status(BAD_REQUEST)
        .send('password length must be between 8 and 64 characters')
    }

    else if (error instanceof ValidationError) {
      error.errors.forEach(error => console.error(error))

      response
        .status(BAD_REQUEST)
        .send(error.errors.map(error => error.message))
    }

    else throw error
  }
})

module.exports = router
