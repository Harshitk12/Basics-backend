const User=require('../models/user')

async function getAllUser(req,res) {
    const allUsers=await User.find({});
    res.send(allUsers);
}

async function getUserById(req,res) {
    const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg:"user not found"})
    res.json(user);
}

async function createUser(req,res) {
    const body=req.body;
    console.log(body)
    if(!body || !body.name || !body.email)
        return res.status(400).json({msg:"All fields are required"})

    const result=await User.create({
        name : body.name,
        email : body.email
    })
    return res.status(201).json({msg:"success"})
}


module.exports={
    getAllUser,
    getUserById,
    createUser,
}