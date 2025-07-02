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

const findProductByFilters = (filters = {}, options = {}) => {
  const query = Product.find(filters);
  if (options.sort) {
    query.sort(options.sort);
  }
  if (options.limit) {
    query.limit(options.limit);
  }
  return query;
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  findProductByFilters,
};
