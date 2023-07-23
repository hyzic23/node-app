const express = require('express');
const { validateUser } = require('../validations/userValidator');
const { validateUserLogin } = require('../validations/loginValidator');
const authController= require('../controllers/authController');
const verify = require('../auth/verifyToken');

const router = express.Router();

router.post('/register', verify, validateUser, authController.register);
router.post('/login', validateUserLogin, authController.login);
router.get('/dummy', authController.dummyApi);

module.exports = router;