module.exports = (sequelize, {
  STRING,
  BOOLEAN
}) => {
  const Task = sequelize.define('Task', {
    description: {
      type: STRING,
      allowNull: false
    },
    isComplete: {
      type: BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'task'
  })

  return Task
}
