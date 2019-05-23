module.exports = (sequelize, {
  STRING
}) => {
  const Task = sequelize.define('Task', {
    description: {
      type: STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'task'
  })

  return Task
}
