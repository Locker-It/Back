const express = require('express');

const router = express.Router();

const userRoutes = require('./userRouter');
const productRoutes = require('./productRouter');
const { USERS_BASE, PRODUCTS_BASE } = require('../constants/apiPaths');

router.use(USERS_BASE, userRoutes);
router.use(PRODUCTS_BASE, productRoutes);

module.exports = router;
