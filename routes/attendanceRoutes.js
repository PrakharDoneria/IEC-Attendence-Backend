const express = require('express');
const { generateCode, submitCode, exportAttendance } = require('../controllers/attendanceController');

const router = express.Router();

router.post('/generate-code', generateCode);
router.post('/submit-code', submitCode);
router.get('/export/:format', exportAttendance);

module.exports = router;
