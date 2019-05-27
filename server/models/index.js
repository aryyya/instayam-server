const fs = require('fs')
const path = require('path')
const knex = require('../../config/database')

const getModelFiles = directory => {
  return fs.readdirSync(directory)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .map(file => path.join(directory, file))
}

const files = getModelFiles(__dirname)

const models = files.reduce((models, filename) => {
  const model = require(filename)(knex)
  if (model) {
    models[model.name] = model
  }
  return models
}, {})

module.exports = models
