const { NODE_ENV } = process.env
const { consoleError } = require('../console')

const valid = [
  'production',
  'development',
  'test'
]

const checkNodeEnv = () => {
  if (!valid.includes(NODE_ENV)) {
    consoleError(`NODE_ENV not set to one of: ${valid.join(', ')}`)
    consoleError('terminating process')
    process.exit(1)
  }
}

module.exports = {
  checkNodeEnv
}
