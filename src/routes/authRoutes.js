const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { LOGIN, REGISTER } = require('../constants/apiPaths');
const auth = require('../middleware/auth');

router.post(REGISTER, userController.registerUser);
router.post(LOGIN, userController.loginUser);

module.exports = router;
