const express = require('express');
const router = express.Router();
const controller = require('../controller/mail.controller')

router.get('/:id', controller.getMail);
router.post('/:id', controller.addTrans);
module.exports = router;