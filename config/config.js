/** @format */

require("dotenv").config;
// const {
//   DB_USERNAME,
//   DB_PASSWORD,
//   DB_NAME,
//   DB_HOSTNAME,
//   DB_HOSTNAME_DIALECT,
// } = require("../env");

const config = {
  DB_HOSTNAME: "us-cdbr-east-06.cleardb.net",
  DB_USERNAME: "b086612cfda8ba",
  DB_PASSWORD: "e02c18c5",
  DB_NAME: "heroku_4940490f60c5eca",
  DB_HOSTNAME_DIALECT: "mysql",
};

module.exports = {
  local: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOSTNAME,
    dialect: config.DB_HOSTNAME_DIALECT,
  },
  development: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOSTNAME,
    dialect: config.DB_HOSTNAME_DIALECT,
  },
  test: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOSTNAME,
    dialect: config.DB_HOSTNAME_DIALECT,
  },
  production: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOSTNAME,
    dialect: config.DB_HOSTNAME_DIALECT,
  },
};
