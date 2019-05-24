const getIsUniqueValidator = (model, field) => {
  return async value => {
    const models = require('../models')
    const record = await models[model].findOne({
      where: {
        [field]: value
      }
    })
    if (record) {
      throw new Error('Not unique')
    }
  }
}

module.exports = {
  getIsUniqueValidator
}
