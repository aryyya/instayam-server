const {
  hash,
  compare
} = require('bcrypt')
const getBaseModel = require('../helpers/get-base-model')

const selectableProps = [
  'id',
  'username',
  'email',
  'passwordHash',
  'created_at',
  'updated_at'
]

module.exports = knex => {
  const baseModel = getBaseModel({
    knex,
    name: 'User',
    tableName: 'users',
    selectableProps
  })

  const create = async ({
    email,
    username,
    password,
    fullName
  }) => {
    const user = await baseModel.create({
      email,
      username,
      passwordHash: await hash(password, 10),
      fullName
    })
    return user
  }

  const verify = async ({
    username,
    password
  }) => {
    const user = await baseModel.findOne({
      username
    })

    if (!user) {
      throw 'USER_NOT_FOUND'
    }

    if (!await compare(password, user.passwordHash)) {
      throw 'INVALID_CREDENTIALS'
    }

    return user
  }

  return {
    ...baseModel,
    create,
    verify
  }
}
