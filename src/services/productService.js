const { StatusCodes } = require('http-status-codes');
const productStatuses = require('../constants/productStatuses');
const {
  LOCKER_CREATION_FAILED,
  PRODUCT_NOT_FOUND,
  PRODUCT_ALREADY_RESERVED,
  LOG_WARNINGS,
} = require('../constants/errorMessages');
const productRepository = require('../repositories/productRepository');
const availableLockerService = require('./availableLockerService');

const getUserCartFilter = (userId) => ({
  status: productStatuses.PENDING,
  reservedBy: userId,
});

const createProduct = async (productData) => {
  const { selectedLockerIds, ...productFields } = productData;

  const product = await productRepository.createProduct(productFields);
  try {
    if (Array.isArray(selectedLockerIds)) {
      await Promise.all(
        selectedLockerIds.map((lockerId) =>
          availableLockerService.createAvailableLocker({
            productId: product._id,
            locker: lockerId,
          }),
        ),
      );
    }
  } catch (lockerErr) {
    console.error(
      `${LOCKER_CREATION_FAILED} for product ${product._id}:`,
      lockerErr.message,
    );
  }
  return product;
};

const getAllProducts = async (filters = {}) => {
  return productRepository.findProductByFilters(filters);
};

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) throw new Error(PRODUCT_NOT_FOUND);

  const availableLockers =
    await availableLockerService.getAvailableLockersByProductId(id);
  return {
    ...(product.toObject ? product.toObject() : product),
    availableLockers: availableLockers,
  };
};

const updateProduct = async (id, updateData, filter = {}) => {
  const updated = await productRepository.updateProduct(id, updateData, filter);

  if (!updated) {
    const exists = await productRepository.getProductById(id);

    const err = new Error(
      exists ? PRODUCT_ALREADY_RESERVED : PRODUCT_NOT_FOUND,
    );
    err.status = exists ? StatusCodes.CONFLICT : StatusCodes.NOT_FOUND;
    throw err;
  }
  return updated;
};

const deleteProduct = async (id) => {
  const { deletedCount } =
    await availableLockerService.deleteAvailableLockersByProductId(id);

  if (deletedCount === 0) {
    console.warn(LOG_WARNINGS.NO_AVAILABLE_LOCKERS_FOR_PRODUCT(id));
  }

  const deletedProduct = await productRepository.deleteProduct(id);
  if (!deletedProduct) throw new Error(PRODUCT_NOT_FOUND);

  return deletedProduct;
};

const addToCart = async (productId, userId, lockerId) => {
  return updateProduct(
    productId,
    {
      status: productStatuses.PENDING,
      reservedBy: userId,
      reservedAt: new Date(),
      lockerId,
    },
    { status: productStatuses.AVAILABLE },
  );
};

const getUserCart = async (userId) =>
  productRepository
    .findProductByFilters(getUserCartFilter(userId))
    .populate('lockerId', 'lockerNumber location');

const removeFromCart = async (productId, userId) => {
  return updateProduct(
    productId,
    {
      status: productStatuses.AVAILABLE,
      reservedBy: null,
      reservedAt: null,
      lockerId: null,
    },
    getUserCartFilter(userId),
  );
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
