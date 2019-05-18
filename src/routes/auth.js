const { Router } = require('express')
const status = require('http-status')
const { getAuthToken } = require('../utility')

const router = Router()

const users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'guest', password: 'guest' }
]

router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    res
      .status(status.BAD_REQUEST)
      .send('missing required parameters: username, password')
    return
  }

  const user = users.find(u => u.username === username && u.password === password)

  if (!user) {
    res
      .status(status.UNAUTHORIZED)
      .send('invalid credentials')
    return
  }

  const token = getAuthToken({
    id: user.id,
    username: user.username
  })

  res
    .status(status.OK)
    .send({
      token
    })
})

module.exports = router
