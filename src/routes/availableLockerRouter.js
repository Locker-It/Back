const express = require('express');

const router = express.Router();
const availableLockerController = require('../controllers/availableLockerController');
const { AVAILABLE_LOCKERS, AVAILABLE_LOCKER_ID } = require('../constants/apiPaths');

router.get(AVAILABLE_LOCKERS, availableLockerController.getAllAvailableLockers);
router.get(AVAILABLE_LOCKER_ID, availableLockerController.getAvailableLockerById);
router.post(AVAILABLE_LOCKERS, availableLockerController.createAvailableLocker);
router.put(AVAILABLE_LOCKER_ID, availableLockerController.updateAvailableLocker);
router.delete(AVAILABLE_LOCKER_ID, availableLockerController.deleteAvailableLocker);

module.exports = router;
