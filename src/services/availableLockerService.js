const availableLockerRepository = require('../repositories/availableLockerRepository');
const productRepository = require('../repositories/productRepository');
const { AVAILABLE_LOCKER_NOT_FOUND } = require('../constants/errorMessages');
const productService = require('./productService');

const createAvailableLocker = async (data) =>
  availableLockerRepository.createAvailableLocker(data);

const getAllAvailableLockers = async () =>
  availableLockerRepository.getAllAvailableLockers();

const getAvailableLockerById = async (id) => {
  const locker = await availableLockerRepository.getAvailableLockerById(id);
  if (!locker) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return locker;
};

const updateAvailableLocker = async (id, data) => {
  const updated = await availableLockerRepository.updateAvailableLocker(
    id,
    data,
  );
  if (!updated) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return updated;
};

const deleteAvailableLocker = async (id) => {
  const deleted = await availableLockerRepository.deleteAvailableLocker(id);
  if (!deleted) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return deleted;
};

const deleteAvailableLockersByProductId = async (productId) => {
  const result = await availableLockerRepository.deleteAvailableLockersByProductId(productId);

  if (result.deletedCount === 0) {
    const err = new Error(AVAILABLE_LOCKER_NOT_FOUND);
    err.status = 404;
    throw err;
  }
  return result;
};

const getAvailableLockersByProductId = async (productId) => {
  const rows =
    await availableLockerRepository.getAvailableLockersByProductId(productId);

  const availableLockers = rows
    .map((r) => r.locker)
    .filter(Boolean)
    .map((locker) => ({
      _id: locker._id,
      location: locker.location,
      lockerNumber: locker.lockerNumber,
    }));

  return availableLockers;
};

module.exports = {
  createAvailableLocker,
  getAllAvailableLockers,
  getAvailableLockerById,
  getAvailableLockersByProductId,
  updateAvailableLocker,
  deleteAvailableLocker,
  deleteAvailableLockersByProductId,
};
