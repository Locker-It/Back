const express = require('express');
const controller = require('../controllers/availableLockerController');
const router = express.Router();

const { AVAILABLE_LOCKERS, AVAILABLE_LOCKER_ID } = require('../constants/apiPaths');

router.get('/', controller.getAllAvailableLockers);
router.get('/:id', controller.getAvailableLockerById);
router.post('/', controller.createAvailableLocker);
router.put('/:id', controller.updateAvailableLocker);
router.delete('/:id', controller.removeAvailableLocker);

module.exports = router;
