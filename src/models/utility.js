const getIsUniqueValidator = (model, field) => {
  return async value => {
    const models = require('.')
    const record = await models[model].findOne({
      where: {
        [field]: value
      }
    })
    if (record) {
      throw new Error(`${field} ${value} already exists`)
    }
  }
}

module.exports = {
  getIsUniqueValidator
}
