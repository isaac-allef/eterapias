const knexfile = require('../../knexfile');
const connectionDB = require('knex')(knexfile.development)

module.exports = connectionDB;