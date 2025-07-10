const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user'); 

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

// Middleware
app.use(cors({
  origin: "http://localhost:5500",
  credentials:true
}));

app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder must exist
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // e.g., 16534834341.png
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
 
const token=req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. No token found in cookies.' });
  }

  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'File uploaded', filePath: `/uploads/${req.file.filename}` });
});
// Connect to DB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
