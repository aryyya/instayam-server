const { Router } = require('express')
const status = require('http-status')
const { hasAuthToken } = require('../utility')
const { User } = require('../models/models')

const router = Router()

router.get('/', (req, res) => {
  res
    .status(status.OK)
    .send('The is a public resource, you can see this.')
})

router.get('/secret', hasAuthToken, (req, res) => {
  User.findAll()
    .then(users => {
      res
        .status(status.OK)
        .send(users)
    })
})

module.exports = router
