const express = require('express');

const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { PURCHASES, PURCHASE_ID } = require('../constants/apiPaths');
const authMiddleware = require('../middleware/authMiddleware');

router.get(PURCHASES, purchaseController.getAllPurchases);
router.get(PURCHASE_ID, purchaseController.getPurchaseById);
router.post(PURCHASES, authMiddleware, purchaseController.createPurchase);
router.put(PURCHASE_ID, purchaseController.updatePurchase);
router.delete(PURCHASE_ID, purchaseController.deletePurchase);

module.exports = router;
