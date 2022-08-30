const express = require('express');
const {addService} = require('../controllers/Services')

const router = express.Router();

router.route('/add').post(addService)

module.exports = router;