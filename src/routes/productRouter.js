const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const { PRODUCTS, PRODUCT_ID , ADD_TO_CART, REMOVE_FROM_CART, USER_CART } = require('../constants/apiPaths');
const authMiddleware = require('../middleware/authMiddleware');

router.get(USER_CART, authMiddleware, productController.getUserCart); 
router.patch(ADD_TO_CART, authMiddleware, productController.addToCart);           
router.patch(REMOVE_FROM_CART, authMiddleware, productController.removeFromCart);

router.get(PRODUCTS, productController.getAllProducts);
router.get(PRODUCT_ID, productController.getProductById);
router.post(PRODUCTS, productController.createProduct);
router.put(PRODUCT_ID, productController.updateProduct);
router.delete(PRODUCT_ID, productController.deleteProduct);
module.exports = router;
