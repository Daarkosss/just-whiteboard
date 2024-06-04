const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  ssoID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: String,
    required: false,
    unique: true
  },
  mouseLeft: {
    type: Number,
    required: true,
    default: 0
  },
  mouseTop: {
    type: Number,
    required: true,
    default: 0
  },
  actualBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: false
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
