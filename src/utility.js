const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')
const {
  OK,
  BAD_REQUEST
} = require('http-status')
const { validationResult } = require('express-validator/check')

const secret = process.env.AUTH_SECRET || 'this is a secret'
const expiresIn = '3 hours'

const getAuthToken = (data) => {
  return jwt.sign({ data }, secret, { expiresIn })
}

const hasAuthToken = expressjwt({
  secret
})

const checkValidationErrors = (request, response, next) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return sendValidationErrorsResponse(response, errors)
  }
  next()
}

const sendValidationErrorsResponse = (response, errors) => {
  response
    .status(BAD_REQUEST)
    .json({
      errors: errors.array()
    })
}

const sendInvalidCredentialsResponse = response => {
  response
    .status(BAD_REQUEST)
    .json({
      errors: [
        'invalid credentials'
      ]
    })
}

const sendAuthTokenResponse = (response, user) => {
  response
    .status(OK)
    .send({
      authToken: getAuthToken({
        id: user.id,
        username: user.username
      })
    })
}

module.exports = {
  getAuthToken,
  hasAuthToken,
  checkValidationErrors,
  sendValidationErrorsResponse,
  sendInvalidCredentialsResponse,
  sendAuthTokenResponse
}
