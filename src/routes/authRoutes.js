const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const {
  LOGIN,
  REGISTER,
  REFRESH,
  LOGOUT,
  CURRENT_USER,
} = require('../constants/apiPaths');
const { getCurrentUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post(REGISTER, userController.registerUser);
router.post(LOGIN, userController.loginUser);
router.get(REFRESH, userController.refreshToken);
router.post(LOGOUT, userController.logoutUser);
router.get(CURRENT_USER, authMiddleware, getCurrentUser);

module.exports = router;
