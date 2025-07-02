const { StatusCodes } = require('http-status-codes');
const purchaseService = require('../services/purchaseService');
const {
  PURCHASE_NOT_FOUND,
  INVALID_INPUT,
  PURCHASES_FETCH_FAILED,
  MONGOOSE_ERROR,
  MISSING_BUYER_ID,
} = require('../constants/errorMessages');

const createPurchase = async (req, res) => {
  try {
    const buyerId = req.user?.userId;
    if (!buyerId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: MISSING_BUYER_ID });
    }
    const purchase = await purchaseService.createPurchase({
      ...req.body,
      buyerId,
    });
    res.status(StatusCodes.CREATED).json({
      ...(purchase.toObject ? purchase.toObject() : purchase),
      productId: req.body.productId,
      lockerId: req.body.lockerId,
    });
  } catch (error) {
    console.error(MONGOOSE_ERROR, error);
    res.status(StatusCodes.BAD_REQUEST).json({ INVALID_INPUT });
  }
};

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await purchaseService.getAllPurchases();
    res.status(StatusCodes.OK).json(purchases);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: PURCHASES_FETCH_FAILED });
  }
};

const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await purchaseService.getPurchaseById(id);
    res.status(StatusCodes.OK).json(purchase);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PURCHASE_NOT_FOUND });
  }
};

const updatePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await purchaseService.updatePurchase(id, req.body);
    res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PURCHASE_NOT_FOUND });
  }
};

const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    await purchaseService.deletePurchase(id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PURCHASE_NOT_FOUND });
  }
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
};
