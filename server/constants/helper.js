const cloudinary = require('../cloudinary/config').v2;
const { MAX_WIDTH, MAX_HEIGHT } = require('../constants/image');
const logger = require('../logger/winston');
const infoMessages = require('../constants/info');

const setServerErrorMessage = (req, error) => {
  return `${error.status || 500} - ${error.message} -\
    ${req.originalUrl} - ${req.method} - ${req.ip}`
  }

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const saveImage = async (img) => {
    const uploadResponse = await cloudinary.uploader.upload(img, {
      width: MAX_WIDTH, height: MAX_HEIGHT, crop: "crop"
    });
    if (!uploadResponse.public_id) {
      logger.error(error.message);
      throw new Error(infoMessages.CLOUDINARY_UPLOAD_FAIL);
    }
    return uploadResponse.public_id;
}

module.exports = {
  setServerErrorMessage,
  generateRandomNumber,
  saveImage
}