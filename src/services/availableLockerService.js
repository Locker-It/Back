const repository = require('../repositories/availableLockerRepository');
const { AVAILABLE_LOCKER_NOT_FOUND } = require('../constants/errorMessages');

const create = (data) => repository.createAvailableLocker(data);

const getAll = () => repository.getAllAvailableLockers();

const getById = async (id) => {
  const locker = await repository.getAvailableLockerById(id);
  if (!locker) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return locker;
};

const update = async (id, data) => {
  const updated = await repository.updateAvailableLocker(id, data);
  if (!updated) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return updated;
};

const remove = async (id) => {
  const deleted = await repository.deleteAvailableLocker(id);
  if (!deleted) throw new Error(AVAILABLE_LOCKER_NOT_FOUND);
  return deleted;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
