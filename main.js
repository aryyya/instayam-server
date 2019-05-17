const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

// Server initialization.

const server = express()
const secret = 'this is a secret'

// Middleware.

server.use(bodyParser.json())

server.use(morgan('dev'))

// State.

const users = [
  { id: 1, username: 'jerry@example.com',  password: 'helloworld123', name: 'Jerry Seinfeld'  },
  { id: 2, username: 'larry@example.com',  password: 'helloworld123', name: 'Larry David'     },
  { id: 3, username: 'george@example.com', password: 'helloworld123', name: 'George Costanza' },
  { id: 4, username: 'kramer@example.com', password: 'helloworld123', name: 'Cosmo Kramer'    },
  { id: 5, username: 'elaine@example.com', password: 'helloworld123', name: 'Elaine Benes'    },
]

// Routes.

server.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = users.filter(u => u.username === username && u.password === password)[0]

  if (!user) {
    return res.json({
      message: 'invalid credentials'
    })
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
