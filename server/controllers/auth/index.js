const { sendAuthTokenResponse } = require('../../routes/helpers')
const { User } = require('../../models')
const sendError = require('../../helpers/send-error')
const {
  UNAUTHORIZED,
  BAD_REQUEST
} = require('http-status')
const { body } = require('express-validator/check')

// POST /sign-up

const postSignUpValidations = [
  body('email')
    .exists()
    .isEmail(),
  body('username')
    .exists()
    .isLength({
      min: User.meta.USERNAME_MIN_LENGTH,
      max: User.meta.USERNAME_MAX_LENGTH
    }),
  body('password')
    .exists()
    .isLength({
      min: User.meta.PASSWORD_MIN_LENGTH,
      max: User.meta.PASSWORD_MAX_LENGTH
    }),
  body('fullName')
    .exists()
    .isLength({
      min: User.meta.FULL_NAME_MIN_LENGTH,
      max: User.meta.FULL_NAME_MAX_LENGTH
    })
]

const postSignUp = async (request, response, next) => {
  const {
    email,
    username,
    password,
    fullName
  } = request.body

  const user = await User.model.create({
    email,
    username,
    password,
    fullName
  })

  if (user.error === User.error.INVALID_DATA) {
    return next(
      sendError({
        code: BAD_REQUEST,
        details: user.details
      })
    )
  }

  else if (user.error === User.error.ALREADY_EXISTS) {
    return next(
      sendError({
        code: BAD_REQUEST,
        details: 'username already exists'
      })
    )
  }

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

  const user = await User.model.verify({
    username,
    password
  })

  if (user.error === User.error.INVALID_DATA) {
    return next(
      sendError({
        code: BAD_REQUEST,
        details: user.details
      })
    )
  }

  else if (user === User.error.NOT_FOUND || user === User.error.INVALID_CREDENTIALS) {
    return next(
      sendError({
        code: UNAUTHORIZED,
        details: 'invalid credentials'
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
