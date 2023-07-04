require('dotenv/config');
const config = require('../config');
const { cloudinary: { cloudName, apiKey, apiSecret }} = config;
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

module.exports = cloudinary;