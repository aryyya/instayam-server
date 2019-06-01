const { Router } = require('express')
const { checkValidationErrors } = require('../helpers')
const {
  postSignUpValidations,
  postSignUp,
  postLoginValidations,
  postLogin,
} = require('../../controllers/auth')

const router = Router()

router.post('/sign-up', /* postSignUpValidations, checkValidationErrors, */ postSignUp)
router.post('/login', /* postLoginValidations, checkValidationErrors, */ postLogin)

module.exports = router
