const jwt = require("jsonwebtoken");

const User=require('../models/user')
const bcrypt=require('bcrypt');

const SECRET = "supersecurekey";

async function signup(req, res){
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  const existingUser = await User.findOne({ name });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({ name, password });
  await newUser.save();
  res.status(201).json({ message: 'User created', userId: newUser._id });
}

async function signin(req,res){
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  const user = await User.findOne({ name });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });
  res.cookie("token", token);
  res.json({ message: 'Login successful'});
}

function signout(req, res) {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
}


module.exports={signin,signup,signout}