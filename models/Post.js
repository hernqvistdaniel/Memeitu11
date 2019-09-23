const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  subject: {
    type: String,
    maxlength: 25
  },
  body: {
    type: String,
    maxlength: 800
  },
  img: String,
  link: String,
  author: {
    type: String
  },
  authorPic: {
    type: String
  },
  room: {
    type: Schema.Types.ObjectId, ref: 'Room'
  },
  points: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: String
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  usersVoted: []
});

module.exports = mongoose.model('Post', PostSchema);