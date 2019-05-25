const chalk = require('chalk')

const consoleColorWrapper = (logger, color) => {
  return (...strings) => {
    return logger(
      color(
        strings.join(' ')
      )
    )
  }
}

module.exports = {
  consoleError: consoleColorWrapper(console.error, chalk.bold.red),
  consoleInfo: consoleColorWrapper(console.log, chalk.bold.blue),
  consoleVerbose: consoleColorWrapper(console.log, chalk.bold.green)
}
