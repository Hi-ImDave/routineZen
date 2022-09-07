const mongoose = require('mongoose')


const RoutineSchema = new mongoose.Schema({
  routine: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Routine', RoutineSchema)