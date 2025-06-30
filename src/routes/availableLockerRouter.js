const express = require('express');

const router = express.Router();
const availableLockerController = require('../controllers/availableLockerController');
const { AVAILABLE_LOCKERS, AVAILABLE_LOCKER_ID, AVAILABLE_LOCKERS_BY_PRODUCT_ID } = require('../constants/apiPaths');

router.get(AVAILABLE_LOCKERS, availableLockerController.getAllAvailableLockers);
router.get(AVAILABLE_LOCKER_ID, availableLockerController.getAvailableLockerById);
router.post(AVAILABLE_LOCKERS, availableLockerController.createAvailableLocker);
router.put(AVAILABLE_LOCKER_ID, availableLockerController.updateAvailableLocker);
router.delete(AVAILABLE_LOCKER_ID, availableLockerController.deleteAvailableLocker);
router.delete(AVAILABLE_LOCKERS_BY_PRODUCT_ID, availableLockerController.deleteAvailableLockersByProductId); 

module.exports = router;
