const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const { LOGIN, REGISTER,REFRESH,LOGOUT } = require('../constants/apiPaths');

router.post(REGISTER, userController.registerUser);
router.post(LOGIN, userController.loginUser);
router.get(REFRESH, userController.refreshToken);
router.post(LOGOUT, userController.logoutUser);

module.exports = router;
