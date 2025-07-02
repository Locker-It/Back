const purchaseRepository = require('../repositories/purchaseRepository');
const lockerService = require('./lockerService');
const productRepository = require('../repositories/productRepository');
const {
  PURCHASE_NOT_FOUND,
  MONGOOSE_ERROR,
} = require('../constants/errorMessages');
const availableLockerRepository = require('../repositories/availableLockerRepository');
const PRODUCT_STATUSES = require('../constants/productStatuses');

const createPurchase = async ({ productId, lockerId, buyerId, ...rest }) => {
  let purchase;
  try {
    purchase = await purchaseRepository.createPurchase({
      productId,
      lockerId,
      buyerId,
      ...rest,
    });
  } catch (err) {
    console.error(MONGOOSE_ERROR, err);
    throw err;
  }
  await lockerService.updateLocker(lockerId, { isAvailable: false });
  const availableLockerRecords = await availableLockerRepository.findByLockerId(lockerId);
  const otherProductIds = [
    ...new Set(
      availableLockerRecords
        .map((m) => m.productId.toString())
        .filter((id) => id !== productId.toString()),
    ),
  ];
  for (const otherId of otherProductIds) {
    const remaining =
      await availableLockerRepository.countAvailableLockersByProductId(
        otherId,
        lockerId,
      );
    if (remaining === 0) {
      await productRepository.updateProduct(otherId, {
        status: PRODUCT_STATUSES.UNAVAILABLE,
      });
      // TODO: Notify the seller that his product was marked as unavailable
    }
  }
  await productRepository.updateProduct(productId, {
    status: PRODUCT_STATUSES.SOLD,
  });

  return {
    ...(purchase.toObject ? purchase.toObject() : purchase),
    productId,
    lockerId,
  };
};

const getAllPurchases = async () => purchaseRepository.getAllPurchases();

const getPurchaseById = async (id) => {
  const purchase = await purchaseRepository.getPurchaseById(id);
  if (!purchase) {
    throw new Error(PURCHASE_NOT_FOUND);
  }
  return purchase;
};

const updatePurchase = async (id, updateData) => {
  const updatedPurchase = await purchaseRepository.updatePurchase(
    id,
    updateData,
  );
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
