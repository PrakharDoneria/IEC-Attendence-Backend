const pool = require('../config/db');

const createAttendanceCode = async (subjectCode, className, createdAt) => {
  const code = generateCode();
  const expiresAt = new Date(new Date().getTime() + 45 * 60000); // Expires in 45 minutes

  const result = await pool.query(
    'INSERT INTO attendance_codes (code, subject_code, class_name, created_at, expires_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [code, subjectCode, className, createdAt, expiresAt]
  );

  return result.rows[0];
};

const validateAttendanceCode = async (code) => {
  const result = await pool.query(
    'SELECT * FROM attendance_codes WHERE code = $1 AND expires_at > NOW()',
    [code]
  );

  return result.rows.length > 0;
};

const markAttendance = async (studentId, attendanceCode) => {
  const result = await pool.query(
    'SELECT id FROM attendance_codes WHERE code = $1',
    [attendanceCode]
  );

  if (result.rows.length) {
    await pool.query(
      'INSERT INTO attendance (student_id, attendance_code_id, timestamp) VALUES ($1, $2, NOW())',
      [studentId, result.rows[0].id]
    );
  } else {
    throw new Error('Attendance code not found');
  }
};

const getAttendanceData = async (subjectCode) => {
  const result = await pool.query(`
    SELECT users.name, attendance_codes.subject_code, attendance.timestamp 
    FROM attendance
    JOIN users ON attendance.student_id = users.id
    JOIN attendance_codes ON attendance.attendance_code_id = attendance_codes.id
    WHERE attendance.timestamp > NOW() - INTERVAL '30 days'
    AND attendance_codes.subject_code = $1
  `, [subjectCode]);
  return result.rows;
};

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

module.exports = { createAttendanceCode, validateAttendanceCode, markAttendance, getAttendanceData };
