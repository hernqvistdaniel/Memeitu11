const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  topic: {
    type: String,
    required: true,
    maxlength: 20
  }
});

module.exports = mongoose.model('Room', RoomSchema);