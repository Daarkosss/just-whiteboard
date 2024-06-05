const mongoose = require("mongoose");

const ObjectSchema = mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  type: {
    type: String,
    required: [true, "Please enter object type"]
  },
  left: {
    type: Number,
    required: true,
    default: 0
  },
  top: {
    type: Number,
    required: true,
    default: 0
  },
  width: {
    type: Number,
    required: true,
    default: 0
  },
  height: {
    type: Number,
    required: true,
    default: 0
  },
  height: {
    type: Number,
    required: true,
    default: 0
  },
  angle: {
    type: Number,
    required: true,
    default: 0
  },
  layer: {
    type: Number,
    required: true,
    default: 0
  },
  fill: {
    type: String,
    required: true,
    default: 'rgba(0, 255, 255, 255)'
  },
  text: {
    type: String,
    required: false
  },
  fontSize: {
    type: Number,
    required: false
  },
  textAlign: {
    type: String,
    required: false
  },
  underline: {
    type: Boolean,
    required: false
  },
  italic: {
    type: Boolean,
    required: false
  },
  bold: {
    type: Boolean,
    required: false
  }
}, {
  timestamps: true
});

const ObjectModel = mongoose.model("Object", ObjectSchema);
module.exports = ObjectModel;
