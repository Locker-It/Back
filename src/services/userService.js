const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { USER_NOT_FOUND } = require('../constants/errorMessages');

const createUser = async (userData) => userRepository.createUser(userData);

const getAllUsers = async () => userRepository.getAllUsers();

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error(USER_NOT_FOUND);
  }
  return user;
};

const updateUser = async (id, updateData) => {
  const updatedUser = await userRepository.updateUser(id, updateData);
  if (!updatedUser) {
    throw new Error(USER_NOT_FOUND);
  }
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await userRepository.deleteUser(id);
  if (!deletedUser) {
    throw new Error(USER_NOT_FOUND);
  }
  return deletedUser;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
