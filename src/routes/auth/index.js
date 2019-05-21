const { Router } = require('express')
const { getAuthToken } = require('../../utility')
const {
  compare,
  hash
} = require('bcrypt')
const { User } = require('../../models')
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED
} = require('http-status')
const { ValidationError } = require('sequelize')
const { check, validationResult } = require('express-validator/check')
const { getIsUniqueValidator } = require('../../models/utility')
const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  FULL_NAME_MIN_LENGTH,
  FULL_NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} = require('../../models/user/constants')

const router = Router()

router.post('/sign-up', [
  check('email')
    .isEmail()
    .custom(getIsUniqueValidator('User', 'email')),
  check('username')
    .isLength({
      min: USERNAME_MIN_LENGTH,
      max: USERNAME_MAX_LENGTH
    })
    .custom(getIsUniqueValidator('User', 'username')),
  check('password')
    .isLength({
      min: PASSWORD_MIN_LENGTH,
      max: PASSWORD_MAX_LENGTH
    }),
  check('fullName')
    .isLength({
      min: FULL_NAME_MIN_LENGTH,
      max: FULL_NAME_MAX_LENGTH
    })
],
async (
  request,
  response
) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    response
      .status(BAD_REQUEST)
      .json({
        errors: errors.array()
      })
    return
  }

  const {
    email,
    username,
    password,
    fullName
  } = request.body

  const passwordHash = await hash(password, 10)

  const user = await User.create({
    email,
    username,
    passwordHash,
    fullName
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
