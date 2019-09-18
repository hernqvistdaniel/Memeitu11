const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  authorPic: {
    type: String
  },
  createdAt: {
    type: String,
  }
});

module.exports = mongoose.model('Comment', CommentSchema);