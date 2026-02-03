const mongoose=require('mongoose')
const User=require('../models/user')
const {v4 : uuidv4} =require('uuid')
const {setUser} =require('../services/auth')

async function signup(req,res){
    const {name, email, password }=req.body;
    console.log(name, email, password)
    await User.create({
        name,
        email,
        password,
    })
    return res.json({msg : 'user created'});
}

async function signin(req,res){
    const {email, password }=req.body;
    const user=await User.findOne({email, password})
    if(!user) return res.json({error : 'wrong email of password'})
    const sessionId=uuidv4(); 
    setUser(sessionId,user)
    res.cookie('uid',sessionId)
    return res.json({msg : 'user found'});
}

module.exports={
    signup,
    signin
};