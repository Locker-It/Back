const AvailableLocker = require('../models/availableLockerModel');

const createAvailableLocker = (data) => AvailableLocker.create(data);

const getAllAvailableLockers = () => AvailableLocker.find();

const getAvailableLockerById = (id) => AvailableLocker.findById(id);

const updateAvailableLocker = (id, data) =>
  AvailableLocker.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteAvailableLocker = (id) => AvailableLocker.findByIdAndDelete(id);

module.exports = {
  createAvailableLocker,
  getAllAvailableLockers,
  getAvailableLockerById,
  updateAvailableLocker,
  deleteAvailableLocker,
};
