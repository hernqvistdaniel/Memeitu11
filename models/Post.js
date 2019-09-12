const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  subject: String,
  body: String,
  room: {
    type: Schema.TypesObjectID, ref: 'Room'
  }
});

module.exports = mongoose.model('Post', PostSchema);