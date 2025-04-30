const express = require('express');

const router = express.Router();

const userRoutes = require('./userRouter');
const productRoutes = require('./productRouter');
const purchaseRouter = require('./purchaseRouter');
const { USERS_BASE, PRODUCTS_BASE,PURCHASES_BASE } = require('../constants/apiPaths');

router.use(USERS_BASE, userRoutes);
router.use(PRODUCTS_BASE, productRoutes);
router.use(PURCHASES_BASE, purchaseRouter);

module.exports = router;
