const { StatusCodes } = require('http-status-codes');
const { AVAILABLE_LOCKER_NOT_FOUND } = require('../constants/errorMessages');

const createAvailableLocker = async (req, res) => {
  try {
    const newLocker = await service.create(req.body);
    res.status(StatusCodes.CREATED).json(newLocker);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getAllAvailableLockers = async (req, res) => {
  try {
    const lockers = await service.getAll();
    res.status(StatusCodes.OK).json(lockers);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getAvailableLockerById = async (req, res) => {
  try {
    const locker = await service.getById(req.params.id);
    res.status(StatusCodes.OK).json(locker);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const updateAvailableLocker = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const removeAvailableLocker = async (req, res) => {
  try {
    await service.remove(req.params.id);
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
  removeAvailableLocker,
};
