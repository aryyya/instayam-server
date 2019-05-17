const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')

// Server initialization.

const server = express()
const secret = 'this is a secret'

// Middleware.

server.use(bodyParser.json())

server.use(morgan('dev'))

server.use(cors())

// State.

const users = [
  { id: 1, email: 'jerry@example.com',  password: 'helloworld123', name: 'Jerry Seinfeld'  },
  { id: 2, email: 'larry@example.com',  password: 'helloworld123', name: 'Larry David'     },
  { id: 3, email: 'george@example.com', password: 'helloworld123', name: 'George Costanza' },
  { id: 4, email: 'kramer@example.com', password: 'helloworld123', name: 'Cosmo Kramer'    },
  { id: 5, email: 'elaine@example.com', password: 'helloworld123', name: 'Elaine Benes'    },
]

// Routes.

server.post('/login', (req, res) => {
  const { email, password } = req.body

  const user = users.filter(u => u.email === email && u.password === password)[0]

  if (!user) {
    return res.status(401).end()
  }

  const token = jwt.sign({
    id: user.id
  }, secret)

  return res.json({
    token
  })
})

server.get('/user/:id', (req, res) => {
  const { id } = req.params
  const token = req.headers.authorization

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.json({
        message: 'invalid token'
      })
    }

    const requestUserId = decoded.id

    if (requestUserId != id) {
      return res.json({
        message: 'not allowed to see other users information'
      })
    }

    const name = users.filter(u => u.id == id)[0].name

    res.json({
      name
    })
  })
})

// Start server.

const port = process.env.PORT || 8085
server.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
