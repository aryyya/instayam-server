const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  UNAUTHORIZED,
  NOT_FOUND
} = require('http-status')

const getSendErrorMiddleware = (errorCode, errorName) => {
  return (
    error,
    request,
    response,
    next
  ) => {
    if (error.code !== errorCode) {
      return next(error)
    }
    response
      .status(errorCode)
      .send({
        status: {
          code: errorCode,
          name: errorName
        },
        message: error.message || `${errorCode} ${errorName}`
      })
  }
}

const catchAll = (request, response, next) => {
  response
    .status(NOT_FOUND)
    .send({
      status: {
        code: NOT_FOUND,
        name: 'not found'
      },
      message: `${NOT_FOUND} not found`
    })
}

module.exports = [
  getSendErrorMiddleware(BAD_REQUEST, 'bad request'),
  getSendErrorMiddleware(INTERNAL_SERVER_ERROR, 'internal server error'),
  getSendErrorMiddleware(FORBIDDEN, 'forbidden'),
  getSendErrorMiddleware(UNAUTHORIZED, 'unauthorized'),
  catchAll
]
