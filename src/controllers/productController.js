const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');
const {
  PRODUCT_NOT_FOUND,
  INVALID_INPUT,
  FAILED_TO_FETCH_PRODUCTS,
  PRODUCT_ALREADY_RESERVED,
  FAILED_TO_ADD_TO_CART,
  FAILED_TO_FETCH_CART,
  NOT_YOUR_CART_ITEM,
  FAILED_TO_UPDATE_PRODUCTS,
  FAILED_TO_REMOVE_FROM_CART,
} = require('../constants/errorMessages');
const productStatuses = require('../constants/productStatuses');
const { normalizeDoc, normalizeMany } = require('../utils/normalize');

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
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
    const product = await productService.getProductById(req.params.id);
    res.status(StatusCodes.OK).json(normalizeDoc(product));
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PRODUCT_NOT_FOUND });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(StatusCodes.OK).json(normalizeDoc(product));
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PRODUCT_NOT_FOUND });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PRODUCT_NOT_FOUND });
  }
};

const addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  try {
    const updated = await productService.updateProduct(
      id,
      {
        status: productStatuses.PENDING,
        reservedBy: userId,
        reservedAt: new Date(),
      },
      { status: productStatuses.AVAILABLE },
    );

    return res.status(StatusCodes.OK).json(normalizeDoc(updated));
  } catch (err) {
    if (err.message === PRODUCT_NOT_FOUND) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: PRODUCT_ALREADY_RESERVED });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: FAILED_TO_ADD_TO_CART });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItems = await productService.getUserCart(userId);
    res.status(200).json(normalizeMany(cartItems));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: FAILED_TO_FETCH_CART });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product || product.reservedBy?.toString() !== userId) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: NOT_YOUR_CART_ITEM });
    }

    const updatedProduct = await productService.updateProduct(id, {
      status: productStatuses.AVAILABLE,
      reservedBy: null,
      reservedAt: null,
    });

    if (!updatedProduct) {
      throw new Error(FAILED_TO_UPDATE_PRODUCTS);
    }

    res.status(StatusCodes.OK).json(normalizeDoc(updatedProduct));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: FAILED_TO_REMOVE_FROM_CART });
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
