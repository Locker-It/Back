const { StatusCodes } = require('http-status-codes');
const lockerService = require('../services/lockerService');
const { LOCKER_NOT_FOUND } = require('../constants/errorMessages');

const createLocker = async (req, res) => {
  try {
    const locker = await lockerService.createLocker(req.body);
    res.status(StatusCodes.CREATED).json(locker);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllLockers = async (req, res) => {
  const lockers = await lockerService.getAllLockers();
  res.status(StatusCodes.OK).json(lockers);
};

const getLockerById = async (req, res) => {
  try {
    const locker = await lockerService.getLockerById(req.params.id);
    res.status(StatusCodes.OK).json(locker);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: LOCKER_NOT_FOUND });
  }
};

const updateLocker = async (req, res) => {
  try {
    const locker = await lockerService.updateLocker(req.params.id, req.body);
    res.status(StatusCodes.OK).json(locker);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: LOCKER_NOT_FOUND });
  }
};

const deleteLocker = async (req, res) => {
  try {
    await lockerService.deleteLocker(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: LOCKER_NOT_FOUND });
  }
};

module.exports = {
  createLocker,
  getAllLockers,
  getLockerById,
  updateLocker,
  deleteLocker,
};
