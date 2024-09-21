# Attendance App

This attendance app allows teachers to generate unique attendance codes for classes, which students can use to mark their attendance. The app supports exporting attendance data based on specified criteria.

## Table of Contents

1. [Installation](#installation)
2. [API Endpoints](#api-endpoints)
   - [Generate Attendance Code](#generate-attendance-code)
   - [Submit Attendance Code](#submit-attendance-code)
   - [Export Attendance Data](#export-attendance-data)
3. [Sample Data](#sample-data)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PrakharDoneria/IEC-Attendence-Backend
   cd attendance-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your database configuration in `config/db.js`.

4. Start the server:
   ```bash
   node app.js
   ```

## API Endpoints

### Generate Attendance Code

- **Endpoint**: `POST /api/attendance/generate-code`
- **Description**: Generates a new unique attendance code for the teacher.
- **Request Body**:
  ```json
  {
    "subject_code": "MATH101",
    "class_name": "Algebra I"
  }
  ```
- **Sample Response**:
  ```json
  {
    "code": "A1B2C3"
  }
  ```

### Submit Attendance Code

- **Endpoint**: `POST /api/attendance/submit-code`
- **Description**: Submits the attendance code provided by the teacher.
- **Request Body**:
  ```json
  {
    "class_code": "A1B2C3",
    "student_id": "12345"
  }
  ```
- **Sample Response**:
  ```json
  {
    "message": "Attendance marked successfully"
  }
  ```

### Export Attendance Data

- **Endpoint**: `GET /api/attendance/export/:format`
- **Description**: Exports attendance data for the specified subject ID and date in the desired format (csv, excel, txt).
- **Request Query Parameters**:
  - `subject_id`: The ID of the subject for which to export attendance.
  - `date`: The date for which to export attendance (in YYYY-MM-DD format).
- **Sample Request**:
  ```
  GET /api/attendance/export/csv?subject_id=MATH101&date=2023-09-20
  ```
- **Sample Response** (CSV format):
  ```csv
  Name,Subject Code,Timestamp
  John Doe,MATH101,2023-09-20T10:00:00+05:30
  Jane Smith,MATH101,2023-09-20T10:05:00+05:30
  ```

## Sample Data

### Attendance Codes

| Code   | Subject Code | Class Name  | Created At           | Expires At            |
|--------|--------------|-------------|----------------------|-----------------------|
| A1B2C3 | MATH101      | Algebra I   | 2023-09-20 09:00:00  | 2023-09-20 09:45:00   |

### Attendance Records

| Student ID | Attendance Code | Timestamp               |
|------------|------------------|-------------------------|
| 12345      | A1B2C3           | 2023-09-20T10:00:00+05:30 |
| 67890      | A1B2C3           | 2023-09-20T10:05:00+05:30 |

## Notes

- Ensure your database is properly configured and running.
- Modify the request parameters as necessary for your implementation.
- This app is intended for educational purposes and should be tested thoroughly before production use.