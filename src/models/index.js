const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('db connection success')
  })
  .catch(error => {
    console.error('db connect failure')
    console.error(error)
  })

const db = {
  User: sequelize.import('./user.js')
}

module.exports = db
