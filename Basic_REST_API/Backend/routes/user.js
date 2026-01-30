const express=require('express')
const { getAllUser,getUserById, createUser } = require('../controllers/user');

const router=express.Router();

router.get('/',getAllUser)
router.get('/:id',getUserById)
router.post('/create',createUser)

module.exports=router