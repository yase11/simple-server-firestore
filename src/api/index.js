const express = require('express');

const router = express.Router();

router.use('/', require('./check-api'));
router.use('/user', require('./user'));
router.use('/corporation', require('./corporation'));
router.use('/signup', require('./signup'));

module.exports = router;