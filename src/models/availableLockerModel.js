const mongoose = require('mongoose');
const MODEL_NAMES = require('../constants/modelNames');

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

module.exports = mongoose.model(MODEL_NAMES.AVAILABLE_LOCKER, availableLockerSchema);

