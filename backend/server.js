const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/admin", require("./routes/auth"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/patients", require("./routes/patients"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/lab", require("./routes/lab"));
app.use("/api/wards", require("./routes/wards"));

// Start Server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
