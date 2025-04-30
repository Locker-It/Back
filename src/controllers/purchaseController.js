const { StatusCodes } = require('http-status-codes');
const purchaseService = require('../services/purchaseService');
const { PURCHASE_NOT_FOUND, INVALID_INPUT } = require('../constants/errorMessages');

const createPurchase = async (req, res) => {
  try {
    const purchase = await purchaseService.create(req.body);
    res.status(StatusCodes.CREATED).json(purchase);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: INVALID_INPUT });
  }
};

const getAllPurchases = async (req, res) => {
  const purchases = await purchaseService.getAll();
  res.status(StatusCodes.OK).json(purchases);
};

const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await purchaseService.getById(id);
    res.status(StatusCodes.OK).json(purchase);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PURCHASE_NOT_FOUND });
  }
};

const updatePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await purchaseService.update(id, req.body);
    res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: PURCHASE_NOT_FOUND });
  }
};

const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    await purchaseService.remove(id);
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
