const AvailableLocker = require('../models/availableLockerModel');
const { LOCKER } = require('../constants/repositoryModel');
const convertObjectId = require('../utils/convertObjectId');
const mongoose = require('mongoose');

const createAvailableLocker = (data) => AvailableLocker.create(data);

const getAllAvailableLockers = () => AvailableLocker.find().populate(LOCKER);

const getAvailableLockerById = (id) =>
  AvailableLocker.findById(id).populate(LOCKER);

const updateAvailableLocker = (id, data) =>
  AvailableLocker.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate(LOCKER);

const deleteAvailableLocker = (id) => AvailableLocker.findByIdAndDelete(id);

const countAvailableLockersByProductId = (productId, reservedLockerId) => {
  return AvailableLocker.countDocuments({
    productId: new mongoose.Types.ObjectId(productId),
    locker: { $ne: new mongoose.Types.ObjectId(reservedLockerId) },
  });
};

const getAvailableLockersByProductId = (productId) =>
  AvailableLocker.find({ productId: convertObjectId(productId) })
    .populate({
      path: LOCKER,
      select: 'lockerNumber location',
      match: { isAvailable: true },
    })
    .lean();

const findByLockerId = (lockerId) =>
  AvailableLocker.find({ locker: lockerId }).lean();

const deleteAvailableLockersByLockerId = (lockerId) =>
  AvailableLocker.deleteMany({ locker: lockerId });

const deleteAvailableLockersByProductId = async (productId) => {
  const objectId = convertObjectId(productId);
  return AvailableLocker.deleteMany({ productId: objectId });
};

module.exports = {
  createAvailableLocker,
  getAllAvailableLockers,
  getAvailableLockerById,
  getAvailableLockersByProductId,
  updateAvailableLocker,
  deleteAvailableLocker,
  countAvailableLockersByProductId,
  findByLockerId,
  deleteAvailableLockersByLockerId,
  deleteAvailableLockersByProductId,
};
