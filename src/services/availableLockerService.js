const availableLockerRepository = require('../repositories/availableLockerRepository');
const { AVAILABLE_LOCKER_NOT_FOUND } = require('../constants/errorMessages');

const createAvailableLocker = async (data) => availableLockerRepository.createAvailableLocker(data);

const getAllAvailableLockers = async () => availableLockerRepository.getAllAvailableLockers();

const getAvailableLockerById = async (id) => {
  const locker = await availableLockerRepository.getAvailableLockerById(id);
  if (!locker) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return locker;
};

const updateAvailableLocker = async (id, data) => {
  const updated = await availableLockerRepository.updateAvailableLocker(id, data);
  if (!updated) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return updated;
};

const deleteAvailableLocker = async (id) => {
  const deleted = await availableLockerRepository.deleteAvailableLocker(id);
  if (!deleted) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return deleted;
};

module.exports = {
  createAvailableLocker,
  getAllAvailableLockers,
  getAvailableLockerById,
  updateAvailableLocker,
  deleteAvailableLocker,
};
