const express = require("express");
const attendanceRoutes = require("./routes/attendanceRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/attendance", attendanceRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
