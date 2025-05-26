const mongoose = require('mongoose');

const availableLockerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    lockerId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AvailableLocker', availableLockerSchema);
