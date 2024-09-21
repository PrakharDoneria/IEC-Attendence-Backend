# Attendance App API

This API allows teachers to generate unique attendance codes and students to submit their attendance using those codes. The app supports data export in various formats.

## Table of Contents
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Generate Attendance Code](#generate-attendance-code)
  - [Submit Attendance Code](#submit-attendance-code)
  - [Export Attendance Data](#export-attendance-data)
  - [Get User Data](#get-user-data)
- [Sample Requests and Responses](#sample-requests-and-responses)

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

3. Set up your environment variables in a `.env` file:
   ```bash
   DB_CONNECTION_STRING=<your_database_connection_string>
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Generate Attendance Code

- **Endpoint**: `POST /api/attendance/generate-code`
- **Description**: Generates a new unique attendance code for the teacher.
- **Request Body**:
  ```json
  {
    "subject_code": "MATH101",
    "class_name": "Calculus"
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
    "class_name": "Calculus"
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
- **Description**: Exports attendance data from the last 30 days in the specified format (csv, excel, txt).
- **Sample Request**: 
  ```
  GET /api/attendance/export/csv
  ```
- **Sample Response**: (CSV format)
  ```
  Name,Subject Code,Timestamp
  John Doe,MATH101,2023-09-20T10:00:00+05:30
  Jane Smith,MATH101,2023-09-20T10:05:00+05:30
  ```

### Get User Data

- **Endpoint**: `GET /api/users/me`
- **Description**: Retrieves information about the authenticated user.
- **Sample Response**:
  ```json
  {
    "id": "user_id",
    "name": "John Doe",
    "role": "teacher"
  }
  ```

## Sample Requests and Responses

### Sample Request for Generating Code
**Request**:
```bash
curl -X POST http://localhost:3000/api/attendance/generate-code \
-H "Content-Type: application/json" \
-d '{"subject_code": "MATH101", "class_name": "Calculus"}'
```

**Sample Response**:
```json
{
  "code": "A1B2C3"
}
```

### Sample Request for Submitting Code
**Request**:
```bash
curl -X POST http://localhost:3000/api/attendance/submit-code \
-H "Content-Type: application/json" \
-d '{"class_code": "A1B2C3", "class_name": "Calculus"}'
```

**Sample Response**:
```json
{
  "message": "Attendance marked successfully"
}
```

### Sample Request for Exporting Data
**Request**:
```bash
curl -X GET http://localhost:3000/api/attendance/export/csv
```

**Sample Response**:
```
Name,Subject Code,Timestamp
John Doe,MATH101,2023-09-20T10:00:00+05:30
Jane Smith,MATH101,2023-09-20T10:05:00+05:30
```

### Sample Request for Getting User Data
**Request**:
```bash
curl -X GET http://localhost:3000/api/users/me
```

**Sample Response**:
```json
{
  "id": "user_id",
  "name": "John Doe",
  "role": "teacher"
}
```