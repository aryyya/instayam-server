const { Router } = require('express')
const {
  checkValidationErrors,
  sendInvalidCredentialsResponse,
  sendAuthTokenResponse
} = require('../helpers')
const { body } = require('express-validator/check')
const { User } = require('../../models')

// move to meta file
const USERNAME_MIN_LENGTH  = 2
const USERNAME_MAX_LENGTH  = 30
const FULL_NAME_MIN_LENGTH = 2
const FULL_NAME_MAX_LENGTH = 100
const PASSWORD_MIN_LENGTH  = 8
const PASSWORD_MAX_LENGTH  = 80

const router = Router()

// POST /sign-up

const signUpValidations = [
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

router.post('/sign-up', signUpValidations, checkValidationErrors, async (request, response) => {
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
})

// POST /login

const loginValidations = [
  body('username')
    .exists(),
  body('password')
    .exists()
]

router.post('/login', loginValidations, checkValidationErrors, async (request, response) => {
  const {
    username,
    password
  } = request.body

  // find user here
  const user = await User.verify({
    username,
    password
  })

  if (!user) {
    return sendInvalidCredentialsResponse(response)
  }

  return sendAuthTokenResponse(response, user)
})

module.exports = router
