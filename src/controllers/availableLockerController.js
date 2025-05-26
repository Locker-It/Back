const service = require('../services/availableLockerService');
const { StatusCodes } = require('http-status-codes');
const { AVAILABLE_LOCKER_NOT_FOUND } = require('../constants/errorMessages');

const create = async (req, res) => {
  try {
    const newLocker = await service.create(req.body);
    res.status(StatusCodes.CREATED).json(newLocker);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  const lockers = await service.getAll();
  res.status(StatusCodes.OK).json(lockers);
};

const getById = async (req, res) => {
  try {
    const locker = await service.getById(req.params.id);
    res.status(StatusCodes.OK).json(locker);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const update = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

const remove = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: AVAILABLE_LOCKER_NOT_FOUND });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
