const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');
const { USER_NOT_FOUND, INVALID_INPUT } = require('../constants/errorMessages');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: INVALID_INPUT });
  }
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(StatusCodes.OK).json(users);
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: USER_NOT_FOUND });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: USER_NOT_FOUND });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: USER_NOT_FOUND });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
