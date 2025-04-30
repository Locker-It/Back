const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');
const { PRODUCT_NOT_FOUND, INVALID_INPUT } = require('../constants/errorMessages');

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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
