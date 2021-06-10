const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  images: {
    type:String,
    required:true
  },
  approve: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: false
  },
  dateCreate: {
    type: Date,
    default: Date.now
  }
})

module.exports = News = mongoose.model('news', NewsSchema);