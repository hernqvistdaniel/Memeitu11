const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    maxlength: 20
  },
  lastName: {
    type: String,
    maxlength: 20
  },
  facebook: {
    type: String,
    maxlength: 50
  },
  location: {
    type: String,
    maxlength: 30
  },
  createdAt: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isMod: {
    type: Boolean,
    default: false
  },
  picLink: {
    type: String,
    default:
      "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg"
  }
});

UserSchema.pre("save", function(next) {
  let user = this;

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

UserSchema.statics.authenticate = function(username, password, next) {
  User.findOne({ username: username }).exec(function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      let err = new Error("User not found.");
      err.status = 401;
      return next(err);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        return next(null, user);
      } else {
        return next();
      }
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
