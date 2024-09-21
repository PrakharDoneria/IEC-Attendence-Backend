const express = require('express');
const { generateCode, submitCode, exportAttendance } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/generate-code', authMiddleware, generateCode);
router.post('/submit-code', authMiddleware, submitCode);
router.get('/export/:format', authMiddleware, exportAttendance);

module.exports = router;
