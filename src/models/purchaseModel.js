const mongoose = require('mongoose');
const { MODEL_NAMES } = require('../constants/modelNames');
const {
  PURCHASE_STATUS_ENUM,
  PURCHASE_STATUS_VALUES,
} = require('../constants/purchaseStatuses');

const purchaseSchema = new mongoose.Schema({
  buyerId: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  lockerId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: PURCHASE_STATUS_VALUES,
    default: PURCHASE_STATUS_ENUM.PENDING,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model(MODEL_NAMES.PURCHASE, purchaseSchema);
