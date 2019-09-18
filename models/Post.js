const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  subject: String,
  body: String,
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
  ]
});

module.exports = mongoose.model('Post', PostSchema);