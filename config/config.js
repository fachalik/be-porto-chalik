/** @format */

require("dotenv").config;
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOSTNAME,
  DB_HOSTNAME_DIALECT,
} = require("../env");
module.exports = {
  local: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: DB_HOSTNAME_DIALECT,
  },
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: DB_HOSTNAME_DIALECT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: DB_HOSTNAME_DIALECT,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: DB_HOSTNAME_DIALECT,
  },
};
