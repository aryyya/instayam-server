const Sequelize = require('sequelize')

const databaseUrl = {
  development: 'postgres://instayam:instayam@localhost:5432/instayam',
  test:        'postgres://instayam:instayam@localhost:5432/instayam',
  production:  process.env.DATABASE_URL
}
const sequelize = new Sequelize(databaseUrl[process.env.NODE_ENV || 'development'])

module.exports = {
  sequelize,
  User: sequelize.import('./user')
}
