const User = require('../models/userModel');

const createUser = (userData) => User.create(userData);

const getAllUsers = () => User.find();

const getUserById = (id) => User.findById(id);

const updateUser = (id, updateData) =>
  User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

const deleteUser = (id) => User.findByIdAndDelete(id);

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
