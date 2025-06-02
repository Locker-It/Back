const repository = require('../repositories/availableLockerRepository');
const { AVAILABLE_LOCKER_NOT_FOUND } = require('../constants/errorMessages');

const createAvailableLocker = (data) => repository.createAvailableLocker(data);

const getAllAvailableLockers = () => repository.getAllAvailableLockers();

const getAvailableLockerById = async (id) => {
  const locker = await repository.getAvailableLockerById(id);
  if (!locker) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return locker;
};

const updateAvailableLocker = async (id, data) => {
  const updated = await repository.updateAvailableLocker(id, data);
  if (!updated) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return updated;
};

const removeAvailableLocker = async (id) => {
  const deleted = await repository.deleteAvailableLocker(id);
  if (!deleted) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return deleted;
};

module.exports = {
  createAvailableLocker,
  getAllAvailableLockers,
  getAvailableLockerById,
  updateAvailableLocker,
  removeAvailableLocker,
};
