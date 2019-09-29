const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
    maxlength: 200
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
