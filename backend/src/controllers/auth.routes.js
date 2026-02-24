const express = require('express');
const router = express.Router();
const { register, login, quickRegister, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/quick-register', quickRegister);
router.get('/me', protect, getMe);

module.exports = router;
