const express=require('express')
const {createShortURL}=require('../controllers/url')

const router=express.Router();

router.post('/',createShortURL);

module.exports=router;