/** @format */

require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOSTNAME: process.env.DB_HOSTNAME,
  DB_HOSTNAME_DIALECT: process.env.DB_HOSTNAME_DIALECT,
  CLOUD_NAME: process.env.CLOUDINARY_NAME,
  CLOUD_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SENDINBLUE_API_KEY: process.env.SENDINBLUE_API_KEY,
};
