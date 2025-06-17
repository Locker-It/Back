const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');
const {
  PRODUCT_NOT_FOUND,
  INVALID_INPUT,
} = require('../constants/errorMessages');
const productStatuses = require('../constants/productStatuses');

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: INVALID_INPUT });
  }
};

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(StatusCodes.OK).json(products);
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PRODUCT_NOT_FOUND });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(StatusCodes.OK).json(product);
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
  const product = await productService.getProductById(id);

  // Check if reserved and not expired
  if (product.status === productStatuses.PENDING) {
    const diff =
      (Date.now() - new Date(product.reservedAt).getTime()) / 1000 / 60;
    if (diff < 5 && product.reservedBy?.toString() !== userId) {
      return res.status(403).json({ error: 'Product is temporarily locked.' });
    }
  }

  const updated = await productService.updateProduct(id, {
    status: productStatuses.PENDING,
    reservedBy: userId,
    reservedAt: new Date(),
  });

  res.status(StatusCodes.OK).json(updated);
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItems = await productService.getUserCart(userId);
    res.status(StatusCodes.OK).json(cartItems);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch cart' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product || product.reservedBy?.toString() !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'Not your cart item' });
    }

    const updatedProduct = await productService.updateProduct(id, {
      status: productStatuses.AVAILABLE,
      reservedBy: null,
      reservedAt: null,
    });

    if (!updatedProduct) {
      throw new Error('Failed to update product');
    }

    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to remove from cart' });
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
