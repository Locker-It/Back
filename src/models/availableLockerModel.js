const mongoose = require('mongoose');
const MODEL_NAMES = require('../constants/modelNames');

const availableLockerSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
    },
    locker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.LOCKER,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(MODEL_NAMES.AVAILABLE_LOCKER, availableLockerSchema);
