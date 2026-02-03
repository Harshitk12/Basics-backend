const express=require('express')
const {signup, signin}=require('../controllers/user')
const restrictToLoggedInUsers=require('../middlewares/auth')

const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/secret',restrictToLoggedInUsers,(req,res)=>{
    res.json({
        user:req.user
    })
})

module.exports=router;