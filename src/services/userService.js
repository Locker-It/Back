const userRepository = require('../repositories/userRepository');
const { USER_NOT_FOUND } = require('../constants/errorMessages');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const registerUser = async ({ name, email, username, password }) => {
  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    throw new Error('Username already taken');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({
    name,
    email,
    username,
    password: hashedPassword,
  });
  return newUser;
};

const loginUser = async ({ username, password }) => {
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
};
