const jwt=require('jsonwebtoken')
const secret='q1w2e3r4t5y6u7i8o9p0'

const setUser=(user)=>{
    const payload={
        _id : user._id,
        name : user.name,
        email : user.email
    }
    return jwt.sign(payload,secret);
}

const getUser=(token)=>{
    try{
        return jwt.verify(token,secret);
    }
    catch(err){
        return null;
    }
}


// const sessionIdToUserMap =new Map()

// const setUser=(uid,user)=>{
//     sessionIdToUserMap.set(uid,user);
// }

// const getUser=(uid)=>{
//     return sessionIdToUserMap.get(uid);
// }

module.exports={
    setUser,
    getUser,
}

