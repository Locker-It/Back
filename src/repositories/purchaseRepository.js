const Purchase = require('../models/purchaseModel');

const createPurchase = (purchaseData) => Purchase.create(purchaseData);

const getAllPurchases = () => Purchase.find();

const getPurchaseById = (id) => Purchase.findById(id);

const updatePurchase = (id, updateData) =>
  Purchase.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

const deletePurchase = (id) => Purchase.findByIdAndDelete(id);

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
};
