const Task = require('../models/Task');
const jwt = require("jsonwebtoken");
const SECRET = "supersecurekey";

// Get all tasks for a specific user
exports.getTasks = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
   jwt.verify(token, SECRET, async (err, userData) => {
    if (err) return res.sendStatus(403);
    const tasks = await Task.find({ user : userData.userId });
    res.json(tasks);
  });
};

// Add a task for a user
exports.addTask = async (req, res) => {
  const { text } = req.body;
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, async (err, userData) => {
    if (err) return res.sendStatus(403);
    const task = new Task({ text, user: userData.userId });
    await task.save();
    res.status(201).json(task);
  });
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  const { id } = req.body;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
};

// Toggle task completion
exports.toggleDone = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  const { id } = req.body;
  const task = await Task.findById(id);
  task.done = !task.done;
  await task.save();
  res.json(task);
};

async function uploadImg(req, res){
 
const token=req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. No token found in cookies.' });
  }

  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'File uploaded', filePath: `/uploads/${req.file.filename}` });
}

exports.uploadImg=uploadImg;
