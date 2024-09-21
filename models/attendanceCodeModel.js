const pool = require('../config/db');

const createAttendanceCode = async (teacherId, subjectCode, className, createdAt) => {
  const code = generateCode();
  const expiresAt = new Date(new Date().getTime() + 45 * 60000); // Expires in 45 minutes

  const result = await pool.query(
    'INSERT INTO attendance_codes (teacher_id, code, subject_code, class_name, created_at, expires_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [teacherId, code, subjectCode, className, createdAt, expiresAt]
  );

  return result.rows[0];
};

const validateAttendanceCode = async (code, className) => {
  const result = await pool.query(
    'SELECT * FROM attendance_codes WHERE code = $1 AND class_name = $2 AND expires_at > NOW()',
    [code, className]
  );

  return result.rows.length > 0; 
};

const getAttendanceCodeDetails = async (code) => {
  const result = await pool.query(
    'SELECT * FROM attendance_codes WHERE code = $1',
    [code]
  );

  if (result.rows.length === 0) throw new Error('Attendance code not found');
  return result.rows[0];
};

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); 
};

module.exports = { createAttendanceCode, validateAttendanceCode, getAttendanceCodeDetails };
