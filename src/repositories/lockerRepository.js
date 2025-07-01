const Locker = require('../models/lockerModel');
const {
  LOCKER_NUMBER,
  LOCKER_LOCATION,
  IS_AVAILABLE,
} = require('../constants/locker.constants');

const createLocker = (data) => Locker.create(data);

const getAllLockers = () => Locker.find();

const getFreeLockers = () =>
  Locker.find({ isAvailable: true }).select(
    `${LOCKER_NUMBER} ${LOCKER_LOCATION} ${IS_AVAILABLE}`,
  );

const getLockerById = (id) => Locker.findById(id);

const updateLocker = (id, data) =>
  Locker.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteLocker = (id) => Locker.findByIdAndDelete(id);

module.exports = {
  createLocker,
  getAllLockers,
  getLockerById,
  updateLocker,
  deleteLocker,
  getFreeLockers,
};
