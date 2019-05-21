const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const { NOT_FOUND } = require('http-status')

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

// catch all routes

server.get('*', (request, response) => {
  response.sendStatus(NOT_FOUND)
})

module.exports = server
