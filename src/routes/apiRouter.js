const express = require('express');

const router = express.Router();

const userRoutes = require('./userRouter');
const productRoutes = require('./productRouter');
const purchaseRouter = require('./purchaseRouter');
const authRoutes = require('./authRoutes');
const lockerRoutes = require('./lockerRouter');
const availableLockerRoutes = require('./availableLockerRouter');
const { AVAILABLE_LOCKERS_BASE } = require('../constants/apiPaths');

const {
  USERS_BASE,
  PRODUCTS_BASE,
  PURCHASES_BASE,
  AUTH_BASE,

} = require('../constants/apiPaths');


const { LOCKERS_BASE } = require('../constants/apiPaths');

router.use(USERS_BASE, userRoutes);
router.use(PRODUCTS_BASE, productRoutes);
router.use(PURCHASES_BASE, purchaseRouter);
router.use(AUTH_BASE, authRoutes);
router.use(LOCKERS_BASE, lockerRoutes);


module.exports = router;
