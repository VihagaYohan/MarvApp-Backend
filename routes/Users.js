const express = require('express');
const {getAllUsers,getUserById,updateUser} = require('../controllers/Users')
const Auth = require('../middleware/Auth')

const router = express.Router();

router.route('/').get(Auth,getAllUsers)

router.route('/:id').get(Auth,getUserById)
.put(Auth,updateUser)

module.exports = router