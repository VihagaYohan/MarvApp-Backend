const express =require('express')
const {getAllExtraServices,getExtraService,
createExtraService,
updateExtraService,
deleteExtraservice} = require('../controllers/ExtraServices')
const Auth = require('../middleware/Auth');

const router =express.Router();

router.route('/').get(Auth,getAllExtraServices).post(Auth,createExtraService)

router.route('/:id').get(Auth,getExtraService).put(Auth,updateExtraService).delete(Auth,deleteExtraservice)

module.exports = router;