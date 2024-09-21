const { createAttendanceCode, validateAttendanceCode, markAttendance, getAttendanceData } = require('../models/attendanceCodeModel');
const { getCurrentISTTime } = require('../utils/timeUtils');
const { exportData } = require('../utils/exportUtils');

const generateCode = async (req, res) => {
  const { subject_code, class_name } = req.body;

  try {
    const code = await createAttendanceCode(subject_code, class_name, getCurrentISTTime());
    res.status(201).json({ code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate attendance code' });
  }
};

const submitCode = async (req, res) => {
  const { class_code, student_id } = req.body; // Accept student ID as a parameter

  try {
    const isValid = await validateAttendanceCode(class_code);
    if (!isValid) return res.status(400).json({ error: 'Invalid or expired code' });

    await markAttendance(student_id, class_code);
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

const exportAttendance = async (req, res) => {
  const { format } = req.params;
  const { subject_code } = req.query;

  try {
    const data = await getAttendanceData(subject_code);
    await exportData(res, data, format);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to export attendance data' });
  }
};

module.exports = { generateCode, submitCode, exportAttendance };
