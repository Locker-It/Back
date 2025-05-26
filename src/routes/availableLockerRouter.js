const express = require('express');
const controller = require('../controllers/availableLockerController');
const router = express.Router();

const availableLockerController = require('../controllers/availableLockerController');
const { AVAILABLE_LOCKERS, AVAILABLE_LOCKER_ID } = require('../constants/apiPaths');


router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
