const express = require('express');

const router = express.Router();

const userRoutes = require('./userRouter');
const { USERS_BASE } = require('../constants/apiPaths');

router.use(USERS_BASE, userRoutes);

module.exports = router;
