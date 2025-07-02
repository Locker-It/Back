const lockerRepository = require('../repositories/lockerRepository');
const {
  LOCKER_NOT_FOUND,
  MISSING_PRODUCTID_IN_LOCKER,
} = require('../constants/errorMessages');
const availableLockerRepository = require('../repositories/availableLockerRepository');
const productRepository = require('../repositories/productRepository');
const { UNAVAILABLE } = require('../constants/productStatuses');

const createLocker = async (data) => lockerRepository.createLocker(data);

const getAllLockers = async () => lockerRepository.getAllLockers();

const getFreeLockers = () => lockerRepository.getFreeLockers();

const getLockerById = async (id) => {
  const locker = await lockerRepository.getLockerById(id);
  if (!locker) throw new Error(LOCKER_NOT_FOUND);
  return locker;
};

const updateLocker = async (id, data) => {
  const updated = await lockerRepository.updateLocker(id, data);
  if (!updated) throw new Error(LOCKER_NOT_FOUND);
  return updated;
};

const deleteLocker = async (id) => {
  const relatedAvailableLockers =
    await availableLockerRepository.findByLockerId(id);

  if (!relatedAvailableLockers?.length) return;
  
  for (const locker of relatedAvailableLockers) {
    if (!locker.productId) {
      console.error(MISSING_PRODUCTID_IN_LOCKER, locker);
    }
  }
  const productIds = relatedAvailableLockers.map((locker) =>
    locker.productId?.toString(),
  );
  for (const productId of productIds) {
    const remainingCount =
      await availableLockerRepository.countAvailableLockersByProductId(
        productId,
        id,
      );
    if (remainingCount === 0) {
      await productRepository.updateProduct(productId, {
        status: UNAVAILABLE,
      });
    }
  }
  await availableLockerRepository.deleteAvailableLockersByLockerId(id);
  const deleted = await lockerRepository.deleteLocker(id);
  if (!deleted) {
    throw new Error(LOCKER_NOT_FOUND);
  }
  return deleted;
};

module.exports = {
  createLocker,
  getAllLockers,
  getLockerById,
  updateLocker,
  deleteLocker,
  getFreeLockers,
};
