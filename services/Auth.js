const SessionIdToUserMap = new Map()

const jwt = require('jsonwebtoken')

function setUser(user){
    const payload = {
        _id:user._id,
        email:user.email
    }
    return jwt.sign(payload,process.env.JWT_SECRET)
}

function getUser(token){
    if(!token){
        return null
    }
    
    try {
        const ans = jwt.verify(token,process.env.JWT_SECRET);
        console.log('ans',ans)
        return ans
    } catch (error) {
        return null
    }
}

module.exports = {setUser,getUser}