const Sequelize = require('sequelize')
const { hashSync } = require('bcrypt')
const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  FULL_NAME_MIN_LENGTH,
  FULL_NAME_MAX_LENGTH
} = require('./constants')

module.exports = (sequelize, {
  STRING
}) => {
  const User = sequelize.define('User', {
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [
          USERNAME_MIN_LENGTH,
          USERNAME_MAX_LENGTH
        ]
      }
    },
    fullName: {
      type: STRING,
      allowNull: true,
      validate: {
        len: [
          FULL_NAME_MIN_LENGTH,
          FULL_NAME_MAX_LENGTH
        ]
      }
    },
    passwordHash: {
      type: STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'user'
  })
  
  User.sync({ force: true })
    .then(() => {
      User.create({ email: 'admin@example.com', username: 'admin', fullName: 'The Admin', passwordHash: hashSync('admin', 10) })
      User.create({ email: 'guest@example.com', username: 'guest', fullName: 'The Guest', passwordHash: hashSync('guest', 10) })
    })

  return User
}
