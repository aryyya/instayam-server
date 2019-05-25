const { Router } = require('express')
const { OK } = require('http-status')
const { hasAuthToken } = require('../utility')

const router = Router()

router.get('/', (request, response) => {
  response
    .status(OK)
    .send('The is a public resource, you can see this.')
})

router.get('/secret', hasAuthToken, (request, response) => {
  response
    .status(OK)
    .send('This is a private resource, you can see this.')
})

module.exports = router
