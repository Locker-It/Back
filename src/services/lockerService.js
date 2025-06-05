const lockerRepository = require('../repositories/lockerRepository');
const { LOCKER_NOT_FOUND } = require('../constants/errorMessages');

const createLocker = async (data) => lockerRepository.createLocker(data);

const getAllLockers = async () => lockerRepository.getAllLockers();

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
  const deleted = await lockerRepository.deleteLocker(id);
  if (!deleted) throw new Error(LOCKER_NOT_FOUND);
  return deleted;
};

module.exports = {
  createLocker,
  getAllLockers,
  getLockerById,
  updateLocker,
  deleteLocker,
};
