const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const availableLockerService = require('../services/availableLockerService');
const {
  AVAILABLE_LOCKER_NOT_FOUND,
  INVALID_INPUT,
  UNKNOWN_ERROR,
  ERROR_IN_AVAILABLE_LOCKER_BY_PRODUCTID,
  FAILED_TO_FETCH_AVAILABLE_LOCKERS,
  ERROR_DELETING_AVAILABLE_LOCKERS_BY_PRODUCT_ID,
} = require('../constants/errorMessages');
const { normalizeDoc, normalizeMany } = require('../utils/normalize');

const createAvailableLocker = async (req, res) => {
  try {
    const locker = await availableLockerService.createAvailableLocker(req.body);
    return res.status(StatusCodes.CREATED).json(normalizeDoc(locker));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: INVALID_INPUT });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: UNKNOWN_ERROR });
  }
};

const getAllAvailableLockers = async (req, res) => {
  try {
    const lockers = await availableLockerService.getAllAvailableLockers();
    res.status(StatusCodes.OK).json(normalizeMany(lockers));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getAvailableLockerById = async (req, res) => {
  try {
    const locker = await availableLockerService.getAvailableLockerById(
      req.params.id,
    );
    res.status(StatusCodes.OK).json(normalizeDoc(locker));
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const updateAvailableLocker = async (req, res) => {
  try {
    const locker = await availableLockerService.updateAvailableLocker(
      req.params.id,
      req.body,
    );
    res.status(StatusCodes.OK).json(normalizeDoc(locker));
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const deleteAvailableLocker = async (req, res) => {
  try {
    await availableLockerService.deleteAvailableLocker(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const deleteAvailableLockersByProductId = async (req, res) => {
  try {
    await availableLockerService.deleteAvailableLockersByProductId(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);        
  } catch (error) {
    const status  = error.status  || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || AVAILABLE_LOCKER_NOT_FOUND;
    console.error(ERROR_DELETING_AVAILABLE_LOCKERS_BY_PRODUCT_ID, message);
    res.status(status).json({ error: message });
  }
};

const getAvailableLockersByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const lockers =
      await availableLockerService.getAvailableLockersByProductId(productId);
      res.status(StatusCodes.OK).json(normalizeMany(lockers));
    } catch (err) {
    console.error(ERROR_IN_AVAILABLE_LOCKER_BY_PRODUCTID, err);
    res.status(500).json({ error: FAILED_TO_FETCH_AVAILABLE_LOCKERS });
  }
};

module.exports = {
  createAvailableLocker,
  getAllAvailableLockers,
  getAvailableLockerById,
  getAvailableLockersByProductId,
  updateAvailableLocker,
  deleteAvailableLocker,
  deleteAvailableLockersByProductId,
};
