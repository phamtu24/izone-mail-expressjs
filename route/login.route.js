const express = require('express');
const controller = require('../controller/login.controller');
const router = express.Router();

router.post('/', controller.login )
module.exports = router;