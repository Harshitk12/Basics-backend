const express = require('express');
const {signin,signup,signout}=require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/signup',signup);

// Signin route
router.post('/signin', signin);

router.post('/logout',signout)

module.exports = router;
