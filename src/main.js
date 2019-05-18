const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// server init

const server = express()

// middleware

server.use(morgan('dev'))

server.use(bodyParser.json())

// root routes

server.get('/', (req, res) => {
  res.end('Hello, world!')
})

// other routes

server.use('/auth', require('./routes/auth'))

server.get('*', (req, res) => {
  res.sendStatus(404)
})

// start server

const port = process.env.PORT || 8085
server.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})
