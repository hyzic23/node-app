const express = require('express');
const { validateUser } = require('../validations/userValidator');
const authController= require('../controllers/authController');

const router = express.Router();

router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);
router.get('/dummy', authController.dummyApi);
router.get('/desire', authController.desire);

module.exports = router;