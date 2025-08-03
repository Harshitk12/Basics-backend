const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/cards");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173", // React frontend
  credentials: true // allow cookies
}));
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/cardApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
