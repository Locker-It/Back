const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const { USERS, USER_BY_ID } = require('../constants/apiPaths');

router.get(USERS, userController.getAllUsers);
router.get(USER_BY_ID, userController.getUserById);
router.post(USERS, userController.createUser);
router.put(USER_BY_ID, userController.updateUser);
router.delete(USER_BY_ID, userController.deleteUser);

module.exports = router;
