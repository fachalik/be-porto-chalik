/** @format */

require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dngs3m82q",
  api_key: "418522811688891",
  api_secret: "XLiw9V2YralLGolODDRg1e4SW08",
});

module.exports = { cloudinary };
