const Sequelize = require('sequelize')
const config = require('../config/config')[process.env.NODE_ENV]
const {
  use_env_variable,
  database,
  username,
  password
} = config
const databaseConnectionUrl = process.env[use_env_variable]
const { consoleError } = require('../console-color')
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

if (use_env_variable && !databaseConnectionUrl) {
  consoleError(`${use_env_variable} is not defined`)
  consoleError('terminating process')
  process.exit(1)
}

const sequelize = use_env_variable
  ? new Sequelize(databaseConnectionUrl, config)
  : new Sequelize(database, username, password, config)

const db = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
