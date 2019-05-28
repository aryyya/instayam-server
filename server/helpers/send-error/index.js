const { INTERNAL_SERVER_ERROR } = require('http-status')

module.exports = ({
  code = INTERNAL_SERVER_ERROR,
  message = 'an error occurred'
}) => {
  return {
    code,
    message
  }
}
