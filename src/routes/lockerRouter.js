const express = require('express');

const router = express.Router();
const lockerController = require('../controllers/lockerController');
const { LOCKERS, LOCKER_ID, LOCKER_AVAILABLE } = require('../constants/apiPaths');

router.get(LOCKERS, lockerController.getAllLockers);
router.get(LOCKER_AVAILABLE, lockerController.getFreeLockers);
router.get(LOCKER_ID, lockerController.getLockerById);
router.post(LOCKERS, lockerController.createLocker);
router.put(LOCKER_ID, lockerController.updateLocker);
router.delete(LOCKER_ID, lockerController.deleteLocker);

module.exports = router;
