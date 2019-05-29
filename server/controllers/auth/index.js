const { sendAuthTokenResponse } = require('../../routes/helpers')
const { User } = require('../../models')
const sendError = require('../../helpers/send-error')
const { UNAUTHORIZED } = require('http-status')
const { body } = require('express-validator/check')

// move to meta file
const USERNAME_MIN_LENGTH  = 2
const USERNAME_MAX_LENGTH  = 30
const FULL_NAME_MIN_LENGTH = 2
const FULL_NAME_MAX_LENGTH = 100
const PASSWORD_MIN_LENGTH  = 8
const PASSWORD_MAX_LENGTH  = 80

// POST /sign-up

const postSignUpValidations = [
  body('email')
    .exists()
    .isEmail(),
  body('username')
    .exists()
    .isLength({
      min: USERNAME_MIN_LENGTH,
      max: USERNAME_MAX_LENGTH
    }),
  body('password')
    .exists()
    .isLength({
      min: PASSWORD_MIN_LENGTH,
      max: PASSWORD_MAX_LENGTH
    }),
  body('fullName')
    .exists()
    .isLength({
      min: FULL_NAME_MIN_LENGTH,
      max: FULL_NAME_MAX_LENGTH
    })
]

const postSignUp = async (request, response) => {
  const {
    email,
    username,
    password,
    fullName
  } = request.body

  const user = await User.create({
    email,
    username,
    password,
    fullName
  })

  return sendAuthTokenResponse(response, user)
}

// POST /login

const postLoginValidations = [
  body('username')
    .exists(),
  body('password')
    .exists()
]

const postLogin = async (request, response, next) => {
  const {
    username,
    password
  } = request.body

  const user = await User.verify({
    username,
    password
  })

  if (user === User.NOT_FOUND || user === User.INVALID_CREDENTIALS) {
    return next(
      sendError({
        code: UNAUTHORIZED,
        message: 'invalid credentials'
      })
    )
  }

  return sendAuthTokenResponse(response, user)
}

module.exports = {
  postSignUpValidations,
  postSignUp,
  postLoginValidations,
  postLogin
}
