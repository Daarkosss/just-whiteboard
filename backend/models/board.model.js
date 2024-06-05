const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
