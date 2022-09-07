const mongoose = require('mongoose')


const BookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  dateStarted: {
    type: Date,
    default: Date.now
  },
  dateCompleted: {
    type: Date,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Books', BookSchema)