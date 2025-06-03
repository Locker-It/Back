const User = require('../models/userModel');

const createUser = (userData) => User.create(userData);

const getAllUsers = () => User.find();

const getUserById = (id) => User.findById(id);

const deleteUser = (id) => User.findByIdAndDelete(id);

const findByUsername = (username) => User.findOne({username});

const updateUser = (id, updateData) =>
  User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

const addRefreshToken = (userId, refreshToken) =>
  User.findByIdAndUpdate(
    userId,
    { $push: { refreshTokens: refreshToken } },
    { new: true }
  );

const removeRefreshToken = (userId, refreshToken) =>
  User.findByIdAndUpdate(
    userId,
    { $pull: { refreshTokens: refreshToken } },
    { new: true }
  );
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findByUsername,
  addRefreshToken,
  removeRefreshToken
};
