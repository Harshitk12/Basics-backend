const {getUser}=require('../services/auth')

function restrictToLoggedInUsers(req,res,next){
    const token=req.cookies?.uid;
    if(!token) return res.status(401).json({msg:'user not authenticated'})
    const user=getUser(token);
    if(!user) return res.status(401).json({msg : 'invalid session'})
       console.log(user)
    req.user=user;
    next();
}

module.exports = restrictToLoggedInUsers;