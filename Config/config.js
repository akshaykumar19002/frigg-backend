require('dotenv').config();

const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const dialect = 'mysql';

const config = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
    logging: false
  },
  test: {
    username,
    password,
    database,
    host,
    dialect
  },
  production: {
    username,
    password,
    database,
    host,
    dialect
  }
}

module.exports = config[process.env.NODE_ENV || 'development'];
