const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const lockerService = require('../services/lockerService');
const {
  LOCKER_NOT_FOUND,
  INVALID_INPUT,
  UNKNOWN_ERROR,
  ERROR_FETCHING_FREE_LOCKERS,
  FAILED_TO_FETCH_FREE_LOCKERS,
} = require('../constants/errorMessages');
const { normalizeDoc, normalizeMany } = require('../utils/normalize');

const createLocker = async (req, res) => {
  try {
    const locker = await lockerService.createLocker(req.body);
    return res.status(StatusCodes.CREATED).json(normalizeDoc(locker));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: INVALID_INPUT });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: UNKNOWN_ERROR });
  }
};

const getAllLockers = async (req, res) => {
  try {
    const lockers = await lockerService.getAllLockers();
    res.status(StatusCodes.OK).json(normalizeMany(lockers));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getFreeLockers = async (req, res) => {
  try {
    const lockers = await lockerService.getFreeLockers();
    res.status(StatusCodes.OK).json(normalizeMany(lockers));
  } catch (err) {
    console.error(ERROR_FETCHING_FREE_LOCKERS, err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: FAILED_TO_FETCH_FREE_LOCKERS });
  }
};

const getLockerById = async (req, res) => {
  try {
    const locker = await lockerService.getLockerById(req.params.id);
    res.status(StatusCodes.OK).json(normalizeDoc(locker));
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: LOCKER_NOT_FOUND });
  }
};

const updateLocker = async (req, res) => {
  try {
    const locker = await lockerService.updateLocker(req.params.id, req.body);
    res.status(StatusCodes.OK).json(normalizeDoc(locker));
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
  getFreeLockers,
};
