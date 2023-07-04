const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const validationMessages = require('../constants/validation');
const {
  DEFAULT_GROUP_IMAGE_PUBLIC_ID,
  AVATAR_IMG_PARAMS
} = require('../constants/image');

const groupsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, validationMessages.GROUP_NAME]
  },
  description: {
    type: String,
    required: [true, validationMessages.GROUP_DESCRIPTION]
  },
  imagePublicId: {
    type: String,
  },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}]
});

groupsSchema.virtual('imgUrl').get(function() {
  const imageId = this.imagePublicId || DEFAULT_GROUP_IMAGE_PUBLIC_ID;
  return cloudinary.url(imageId, AVATAR_IMG_PARAMS);
});

groupsSchema.set('toObject', { virtuals: true })
groupsSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Groups', groupsSchema, 'groups');