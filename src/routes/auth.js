const { Router } = require('express')
const { getAuthToken } = require('../utility')
const { compare } = require('bcrypt')
const { User } = require('../models')
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED
} = require('http-status')

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
    return
  }

  catch (error) {
    if (error === 'MISSING_PARAMETERS') {
      response
        .status(BAD_REQUEST)
        .send('required parameters: username, password')
      return
    }

    if (error === 'INVALID_CREDENTIALS' || error === 'USER_NOT_FOUND') {
      response
        .status(UNAUTHORIZED)
        .send('invalid credentials')
      return
    }
  }
})

module.exports = router
