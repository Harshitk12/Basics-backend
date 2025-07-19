const Task = require('../models/Task');
const img=require('../models/img');
const jwt = require("jsonwebtoken");
const SECRET = "supersecurekey";

// Get all tasks for a specific user
exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user : req.user.userId });
    res.json(tasks);
};

// Add a task for a user
exports.addTask = async (req, res) => {
  const { text } = req.body;
    const task = new Task({ text, user: req.user.userId });
    await task.save();
    res.status(201).json(task);
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.body;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
};

// Toggle task completion
exports.toggleDone = async (req, res) => {
  const { id } = req.body;
  const task = await Task.findById(id);
  task.done = !task.done;
  await task.save();
  res.json(task);
};

exports.getImg=async (req,res)=>{
  const images=await img.find({user:req.user.userId})
  return res.json(images);
}

async function uploadImg(req, res){
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const newimg=new img({url:req.file.path,user:req.user.userId});
  await newimg.save();
  res.json({message:'success'});
}


exports.uploadImg=uploadImg;
