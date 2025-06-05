const AvailableLocker = require('../models/availableLockerModel');
const { LOCKER } = require('../constants/repositoryModel');

const createAvailableLocker = (data) => AvailableLocker.create(data);

const getAllAvailableLockers = () => AvailableLocker.find().populate(LOCKER);

const getAvailableLockerById = (id) => AvailableLocker.findById(id).populate(LOCKER);

const updateAvailableLocker = (id, data) =>
  AvailableLocker.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate(LOCKER);

const deleteAvailableLocker = (id) => AvailableLocker.findByIdAndDelete(id);

module.exports = {
  createAvailableLocker,
  getAllAvailableLockers,
  getAvailableLockerById,
  updateAvailableLocker,
  deleteAvailableLocker,
};
