const {
  hash,
  compare
} = require('bcrypt')

const name = 'User'
const tableName = 'users'

module.exports = knex => {

  const create = async ({
    email,
    username,
    password,
    fullName
  }) => {
    const passwordHash = await hash(password, 10)

    const user = await knex(tableName)
      .insert({
        email,
        username,
        passwordHash,
        fullName
      })

    return user
  }

  const verify = async ({
    username,
    password
  }) => {

    const user = await knex(tableName)
      .where({
        username
      })
      .first()

    console.log(user)

    if (!user) {
      throw 'USERNAME_NOT_FOUND'
    }

    const isEqual = await compare(password, user.passwordHash)

    if (!isEqual) {
      throw 'INVALID_CREDENTIALS'
    }

    return user
  }

  return {
    name,
    tableName,
    create,
    verify
  }
}
