const purchaseRepository = require('../repositories/purchaseRepository');
const { PURCHASE_NOT_FOUND } = require('../constants/errorMessages');

const createPurchase = async (purchaseData) => purchaseRepository.createPurchase(purchaseData);

const getAllPurchases = async () => purchaseRepository.getAllPurchases();

const getPurchaseById = async (id) => {
  const purchase = await purchaseRepository.getPurchaseById(id);
  if (!purchase) {
    throw new Error(PURCHASE_NOT_FOUND);
  }
  return purchase;
};

const updatePurchase = async (id, updateData) => {
  const updatedPurchase = await purchaseRepository.updatePurchase(id, updateData);
  if (!updatedPurchase) {
    throw new Error(PURCHASE_NOT_FOUND);
  }
  return updatedPurchase;
};

const deletePurchase = async (id) => {
  const deletedPurchase = await purchaseRepository.deletePurchase(id);
  if (!deletedPurchase) {
    throw new Error(PURCHASE_NOT_FOUND);
  }
  return deletedPurchase;
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
};
