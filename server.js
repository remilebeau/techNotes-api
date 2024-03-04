require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

// connect to db
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors(corsOptions));

// routes
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

// start server
mongoose.connection.once("open", () => {
  console.log(process.env.NODE_ENV);
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
