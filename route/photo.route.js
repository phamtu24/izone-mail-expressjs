const express = require('express');
const controller = require('../controller/photos.controller');
const router = express.Router();

router.get('/all-photos', controller.getAll);
router.get('/:id', controller.filter);
module.exports = router;