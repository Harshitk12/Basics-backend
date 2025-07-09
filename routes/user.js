const express = require('express');
const {signin,signup}=require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/signup',signup);

// Signin route
router.post('/signin', signin);

module.exports = router;
