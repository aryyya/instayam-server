const {
  hash,
  compare
} = require('bcrypt')
const getBaseModel = require('../../helpers/get-base-model')
const {
  NOT_FOUND,
  INVALID_CREDENTIALS,
  INVALID_DATA
} = require('./error')
const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH
} = require('./meta')
const Joi = require('@hapi/joi')

const joiValidate = ({ data, schema }) => {
  return Joi.validate(data, Joi.object().keys(schema), { abortEarly: false })
}

const joiInvalidDataError = results => {
  return {
    error: INVALID_DATA,
    details: results.error.details.map(detail => detail.message)
  }
}

const name = 'User'
const tableName = 'users'
const selectableProps = [
  'id',
  'username',
  'email',
  'created_at',
  'updated_at'
]

module.exports = knex => {
  const baseModel = getBaseModel({
    knex,
    name,
    tableName,
    selectableProps
  })

  const create = async ({
    email,
    username,
    password,
    fullName
  }) => {
    const results = joiValidate({
      data: {
        email,
        username,
        password,
        fullName
      },
      schema: {
        email: Joi.string().email().required(),
        username: Joi.string().min(USERNAME_MIN_LENGTH).max(USERNAME_MAX_LENGTH).required(),
        password: Joi.string().required(),
        fullName: Joi.string()
      }
    })
    if (results.error) {
      return joiInvalidDataError(results)
    }

    const passwordHash = await hash(password, 10)
    
    const user = await baseModel.create({
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
    const results = joiValidate({
      data: {
        username,
        password,
      },
      schema: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    })
    if (results.error) {
      return joiInvalidDataError(results)
    }

    const user = await knex(tableName)
      .select()
      .first()
      .where({ username })
      .timeout(baseModel.timeout)

    if (!user) {
      return NOT_FOUND
    }

    if (!await compare(password, user.passwordHash)) {
      return INVALID_CREDENTIALS
    }

    return user
  }

  return {
    ...baseModel,
    create,
    verify
  }
}
