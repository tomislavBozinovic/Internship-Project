const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const {
  DEFAULT_EMPLOYEE_IMAGE_PUBLIC_ID,
  AVATAR_IMG_PARAMS
} = require('../constants/image');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  pet: {
    type: String
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
  imagePublicId: {
    type: String,
  }
}, {
  timestamps: true
});

employeeSchema.virtual('groups', {
  ref: 'Groups',
  localField: '_id',
  foreignField: 'employees'
});

employeeSchema.virtual('imgUrl').get(function() {
  const imageId = this.imagePublicId || DEFAULT_EMPLOYEE_IMAGE_PUBLIC_ID;
  return cloudinary.url(imageId, AVATAR_IMG_PARAMS);
})

employeeSchema.set('toObject', { getters: true, virtuals: true });
employeeSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Employee', employeeSchema);