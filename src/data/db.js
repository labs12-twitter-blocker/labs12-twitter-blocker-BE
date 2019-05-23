const knex = require('knex');
// const knexConfig = require('../../knexfile.js');
const config = require('../../knexfile');
// let dbEnv = ''
// if (process.env.DB_ENV === 'production') {
//     dbEnv = process.env.DB_ENV
//   } else {
//     dbEnv = 'development';
//   }
const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(config[dbEnv]);
