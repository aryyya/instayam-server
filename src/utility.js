const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')

const secret = process.env.AUTH_SECRET || 'this is a secret'
const expiresIn = '3 hours'

const getAuthToken = (data) => {
  return jwt.sign({ data }, secret, { expiresIn })
}

const hasAuthToken = expressjwt({
  secret
})

module.exports = {
  getAuthToken,
  hasAuthToken
}
