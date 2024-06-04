const mongoose = require("mongoose");

const PrivilegesSchema = mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true  // opcjonalnie, jeśli chcesz śledzić daty utworzenia i modyfikacji
});

const Privileges = mongoose.model("Privileges", PrivilegesSchema);
module.exports = Privileges;
