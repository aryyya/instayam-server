const { Router } = require('express')
const {
  checkValidationErrors,
  sendInvalidCredentialsResponse,
  sendAuthTokenResponse
} = require('../utility')
const {
  compare,
  hash
} = require('bcrypt')
const { User } = require('../../models')
const { body } = require('express-validator/check')
const { getIsUniqueValidator } = require('../../models/validators')
const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  FULL_NAME_MIN_LENGTH,
  FULL_NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} = require('../../models/user/meta')

const router = Router()

// POST /sign-up

const signUpValidations = [
  body('email')
    .exists()
    .isEmail()
    .custom(getIsUniqueValidator('User', 'email')),
  body('username')
    .exists()
    .isLength({
      min: USERNAME_MIN_LENGTH,
      max: USERNAME_MAX_LENGTH
    })
    .custom(getIsUniqueValidator('User', 'username')),
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
    passwordHash: await hash(password, 10),
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

  const user = await User.findOne({
    where: {
      username
    }
  })

  if (!user || !await compare(password, user.passwordHash)) {
    return sendInvalidCredentialsResponse(response)
  }

  return sendAuthTokenResponse(response, user)
})

module.exports = router
