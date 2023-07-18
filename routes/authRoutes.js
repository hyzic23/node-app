const express = require('express');
const authController= require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.get('/dummy', authController.dummyApi);

module.exports = router;