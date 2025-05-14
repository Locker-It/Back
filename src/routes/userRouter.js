const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const { USERS, USER_ID } = require('../constants/apiPaths');
const authenticate = require('../middleware/auth');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.get(USERS, userController.getAllUsers);
router.get(USER_ID, authenticate, authorizeAdmin, userController.getUserById);
router.post(USERS, userController.createUser);
router.put(USER_ID, userController.updateUser);
router.delete(USER_ID, userController.deleteUser);

module.exports = router;
