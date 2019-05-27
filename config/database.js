const knex = require('knex')
const knexfile = require('../knexfile')
const { NODE_ENV } = process.env
const connection = knexfile[NODE_ENV]

module.exports = knex(connection)
