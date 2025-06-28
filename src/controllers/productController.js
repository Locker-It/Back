const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');
const {
  PRODUCT_NOT_FOUND,
  INVALID_INPUT,
  FAILED_TO_FETCH_PRODUCTS,
  FAILED_TO_ADD_TO_CART,
  FAILED_TO_FETCH_CART,
  FAILED_TO_REMOVE_FROM_CART, MISSING_OWNER_ID,
} = require('../constants/errorMessages');
const { normalizeDoc, normalizeMany } = require('../utils/normalize');
const { getUserId, getProductId } = require('../utils/request');

const createProduct = async (req, res) => {
  try {
    const ownerId = req.user?.userId;
    if (!ownerId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: MISSING_OWNER_ID });
    }

    const product = await productService.createProduct({
      ...req.body,
      ownerId,
    });

    res.status(StatusCodes.CREATED).json(normalizeDoc(product));
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: INVALID_INPUT });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { status } = req.query;
    const filters = {};
    if (status) {
      filters.status = status.toLowerCase();
    }

    const products = await productService.getAllProducts(filters);
    res.status(StatusCodes.OK).json(normalizeMany(products));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: FAILED_TO_FETCH_PRODUCTS,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = getProductId(req);
    const product = await productService.getProductById(productId);
    res.status(StatusCodes.OK).json(normalizeDoc(product));
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PRODUCT_NOT_FOUND });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = getProductId(req);
    const product = await productService.updateProduct(productId, req.body);
    res.status(StatusCodes.OK).json(normalizeDoc(product));
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PRODUCT_NOT_FOUND });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = getProductId(req);
    await productService.deleteProduct(productId);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PRODUCT_NOT_FOUND });
  }
};

const addToCart = async (req, res) => {
  const userId = getUserId(req);
  const productId = getProductId(req);

  try {
    const updatedProduct = await productService.addToCart(productId, userId);
    return res.status(StatusCodes.OK).json(normalizeDoc(updatedProduct));
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || FAILED_TO_ADD_TO_CART;
    return res.status(status).json({ error: message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const cartItems = await productService.getUserCart(userId);
    res.status(StatusCodes.OK).json(normalizeMany(cartItems));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: FAILED_TO_FETCH_CART });
  }
};

const removeFromCart = async (req, res) => {
  const userId = getUserId(req);
  const productId = getProductId(req);

  try {
    const updatedProduct = await productService.removeFromCart(
      productId,
      userId,
    );
    res.status(StatusCodes.OK).json(normalizeDoc(updatedProduct));
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || FAILED_TO_REMOVE_FROM_CART;
    res.status(status).json({ error: message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToCart,
  getUserCart,
  removeFromCart,
};
