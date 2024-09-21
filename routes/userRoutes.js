const express = require('express');
const { getUserData } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, getUserData);

module.exports = router;
