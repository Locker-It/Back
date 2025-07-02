const mongoose = require('mongoose');
const MODEL_NAMES = require('../constants/modelNames');
const PURCHASE_STATUSES = require('../constants/purchaseStatuses');

const purchaseSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.PRODUCT,
      required: true,
      unique: true,
    },
    lockerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: [
        PURCHASE_STATUSES.PENDING,
        PURCHASE_STATUSES.APPROVED,
        PURCHASE_STATUSES.DELIVERED,
        PURCHASE_STATUSES.CANCELLED,
      ],
      default: PURCHASE_STATUSES.PENDING,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(MODEL_NAMES.PURCHASE, purchaseSchema);
