const { createAttendanceCode, validateAttendanceCode, markAttendance, getAttendanceData } = require('../models/attendanceCodeModel');
const { getCurrentISTTime } = require('../utils/timeUtils');
const { exportData } = require('../utils/exportUtils');

const generateCode = async (req, res) => {
  const { subject_code, class_name } = req.body;
  const teacherId = req.user.id;

  try {
    const code = await createAttendanceCode(teacherId, subject_code, class_name, getCurrentISTTime());
    res.status(201).json({ code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate attendance code' });
  }
};

const submitCode = async (req, res) => {
  const { class_code, class_name } = req.body;
  const studentId = req.user.id;

  try {
    const isValid = await validateAttendanceCode(class_code, class_name);
    if (!isValid) return res.status(400).json({ error: 'Invalid or expired code' });

    await markAttendance(studentId, class_code);
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

const exportAttendance = async (req, res) => {
  const { format } = req.params;

  try {
    const data = await getAttendanceData(); // Fetch last 30 days data
    await exportData(res, data, format);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to export attendance data' });
  }
};

module.exports = { generateCode, submitCode, exportAttendance };
