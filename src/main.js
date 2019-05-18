const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const server = express()

server.use(morgan('dev'))

server.use(bodyParser.json())

server.get('/', (req, res) => {
  res.end('Hello, world!')
})

server.get('*', (req, res) => {
  res.sendStatus(404)
})

const port = process.env.PORT || 8085
server.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})
