const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// server init

const server = express()

// middleware

server.use(morgan('dev'))

server.use(bodyParser.json())

server.use(cors())

// routes

const {
  auth,
  resource
} = require('./routes')

server.use('/auth', auth)
server.use('/resource', resource)

const errorHandlers = require('./middleware/error-handlers')
server.use(errorHandlers)

module.exports = server
