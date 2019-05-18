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

// root routes

server.get('/', (req, res) => {
  res.end('Hello, world!')
})

// other routes

server.use('/auth', require('./routes/auth'))
server.use('/resource', require('./routes/resource'))

server.get('*', (req, res) => {
  res.sendStatus(404)
})

// start server

const port = process.env.PORT || 8085
server.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})
