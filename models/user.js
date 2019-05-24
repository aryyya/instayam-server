module.exports = (sequelize, {
  STRING
}) => {
  const User = sequelize.define('User', {
    email: STRING,
    username: STRING,
    password: STRING,
    fullName: STRING
  }, {});

  User.associate = models => {}

  return User
}