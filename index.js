const express = require('express');
const attendanceRoutes = require('./routes/attendanceRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json());
app.use('/api/attendance', attendanceRoutes);
app.use('/api/users', userRoutes);

// Centralized error handling
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
