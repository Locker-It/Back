const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const { PRODUCTS, PRODUCT_ID } = require('../constants/apiPaths');

router.get(PRODUCTS, productController.getAllProducts);
router.get(PRODUCT_ID, productController.getProductById);
router.post(PRODUCTS, productController.createProduct);
router.put(PRODUCT_ID, productController.updateProduct);
router.delete(PRODUCT_ID, productController.deleteProduct);

module.exports = router;
