const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const availableLockerService = require('../services/availableLockerService');
const {
  AVAILABLE_LOCKER_NOT_FOUND,
  INVALID_INPUT,
  UNKNOWN_ERROR,
} = require('../constants/errorMessages');

const createAvailableLocker = async (req, res) => {
  try {
    const locker = await availableLockerService.createAvailableLocker(req.body);
    return res.status(StatusCodes.CREATED).json(locker);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: INVALID_INPUT });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: UNKNOWN_ERROR });
  }
};

const getAllAvailableLockers = async (req, res) => {
  try {
    const lockers = await availableLockerService.getAllAvailableLockers();
    res.status(StatusCodes.OK).json(lockers);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getAvailableLockerById = async (req, res) => {
  try {
    const locker = await availableLockerService.getAvailableLockerById(req.params.id);
    res.status(StatusCodes.OK).json(locker);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const updateAvailableLocker = async (req, res) => {
  try {
    const locker = await availableLockerService.updateAvailableLocker(req.params.id, req.body);
    res.status(StatusCodes.OK).json(locker);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const deleteAvailableLocker = async (req, res) => {
  try {
    await availableLockerService.deleteAvailableLocker(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

module.exports = {
  createAvailableLocker,
  getAllAvailableLockers,
  getAvailableLockerById,
  updateAvailableLocker,
  deleteAvailableLocker,
};
