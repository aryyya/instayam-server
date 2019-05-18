const { Router } = require('express')
const status = require('http-status')
const { hasAuthToken } = require('../utility')

const router = Router()

router.get('/', (req, res) => {
  res
    .status(status.OK)
    .send('The is a public resource, you can see this.')
})

router.get('/secret', hasAuthToken, (req, res) => {
  res
    .status(status.OK)
    .send('This is a secret resource, you should be logged in to see this.')
})

module.exports = router
