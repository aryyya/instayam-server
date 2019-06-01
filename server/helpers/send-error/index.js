const { INTERNAL_SERVER_ERROR } = require('http-status')

module.exports = ({
  code = INTERNAL_SERVER_ERROR,
  details = 'an error occurred'
} = {}) => {
  return {
    code,
    details
  }
}
