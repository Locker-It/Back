const Product = require('../models/productModel');

const createProduct = (productData) => Product.create(productData);

const getAllProducts = () => Product.find();

const getProductById = (id) => Product.findById(id);

const updateProduct = (id, updateData, filter = {}) =>
  Product.findOneAndUpdate(
    { _id: id, ...filter }, 
    updateData,
    { new: true, runValidators: true },
  );

const deleteProduct = (id) => Product.findByIdAndDelete(id);

const findProductByFilters = (filters) => Product.find(filters);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  findProductByFilters,
};
