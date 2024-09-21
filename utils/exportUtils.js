const fastcsv = require('fast-csv');
const exceljs = require('exceljs');

const exportData = async (res, data, format) => {
  if (format === 'csv') {
    res.setHeader('Content-Disposition', 'attachment; filename=attendance.csv');
    fastcsv.write(data, { headers: true }).pipe(res);
  } else if (format === 'excel') {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Subject Code', key: 'subject_code', width: 15 },
      { header: 'Timestamp', key: 'timestamp', width: 25 },
    ];

    worksheet.addRows(data);
    res.setHeader('Content-Disposition', 'attachment; filename=attendance.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } else if (format === 'txt') {
    res.setHeader('Content-Disposition', 'attachment; filename=attendance.txt');
    const txtData = data.map(row => `${row.name}, ${row.subject_code}, ${row.timestamp}`).join('\n');
    res.send(txtData);
  } else {
    res.status(400).json({ error: 'Invalid format' });
  }
};

module.exports = { exportData };
