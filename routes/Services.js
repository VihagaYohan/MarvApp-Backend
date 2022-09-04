const express = require('express');
const {addService,getAllServices,updateService,deleteService} = require('../controllers/Services')
const Auth = require('../middleware/Auth')

const router = express.Router();

router.route('/').post(Auth,addService).get(getAllServices)

router.route('/:id').put(Auth,updateService).delete(Auth,deleteService)

module.exports = router;