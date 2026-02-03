const sessionIdToUserMap =new Map()

const setUser=(uid,user)=>{
    sessionIdToUserMap.set(uid,user);
}

const getUser=(uid)=>{
    return sessionIdToUserMap.get(uid);
}

module.exports={
    setUser,
    getUser,
}