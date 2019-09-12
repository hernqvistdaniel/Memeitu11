const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  subject: String,
  body: String,
  img: String,
  link: String,
  room: {
    type: Schema.Types.ObjectID, ref: 'Room'
  },
  points: {
    type: Number,
    default: 0
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Post', PostSchema);