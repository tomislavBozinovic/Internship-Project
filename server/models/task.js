const mongoose = require('mongoose');
const dayjs = require('dayjs');
const Employee = require('./employee');

const validationMessages = require('../constants/validation');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, validationMessages.TASK_NAME]
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
    required: true
  },
  deadline: {
    type: String,
    required: [true, validationMessages.TASK_DEADLINE]
  },
  completed: {
    type: Boolean, 
    default: false
  }
}, {
  timestamps: true
});

taskSchema.virtual('isExpired').get(function () {
    return dayjs(Date.now()).isAfter(new Date(this.deadline));
});

taskSchema.pre('deleteOne', { document: true }, function(next) {
  Employee.findById(this.employee).exec((_, item) => {
    const index = item.tasks.indexOf(item.tasks.find(e => e._id === this._id));
    item.tasks.splice(index, 1);
    item.save(() => { next(); });
  });
});

taskSchema.pre('save', function(next) {
  Employee.findById(this.employee).exec((_, item) => {
    item.tasks.push(this);
    item.save(() => { next(); });
  });
});

taskSchema.set('toObject', { virtuals: true })
taskSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Task', taskSchema);