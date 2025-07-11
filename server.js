const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
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


// Connect to DB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
