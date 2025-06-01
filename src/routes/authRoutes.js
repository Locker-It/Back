const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const { LOGIN, REGISTER,REFRESH } = require('../constants/apiPaths');

router.post(REGISTER, userController.registerUser);
router.post(LOGIN, userController.loginUser);
router.post(REFRESH, userController.refreshToken);

module.exports = router;
