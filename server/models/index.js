const knex = require('../../config/database')

const models = [
  { name: 'User', path: './user' }
]

module.exports = models.reduce((models, { name, path }) => {
  const {
    model,
    error,
    meta
  } = require(path)

  return {
    ...models,
    [name]: {
      model: model(knex),
      error,
      meta
    }
  }
}, {})
