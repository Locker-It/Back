const mongoose = require('mongoose');
const MODEL_NAMES = require('../constants/modelNames');

const lockerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(MODEL_NAMES.LOCKER, lockerSchema);
