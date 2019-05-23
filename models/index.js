const Sequelize = require('sequelize')
const config = require('../config/config')[process.env.NODE_ENV]
const {
  use_env_variable,
  database,
  username,
  password
} = config

const sequelize = use_env_variable
  ? new Sequelize(process.env[use_env_variable], config)
  : new Sequelize(database, username, password,  config)

const db = {
  Sequelize,
  sequelize,
  User: sequelize.import('./user'),
  Task: sequelize.import('./task')
}

const dbModelNames = Object.keys(db).filter(key => {
  return key.toLowerCase() !== 'sequelize'
})

dbModelNames.forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = db
