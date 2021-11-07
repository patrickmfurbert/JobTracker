const router = module.exports = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/jobapps', require('./jobapps'));
