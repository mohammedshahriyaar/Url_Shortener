const {getUser} = require('../services/Auth')
async function restrictToLoggedInUserOnly(req,res,next) {
    const jwt = req.cookies?.jwt
    // console.log(sessionID)
    console.log(jwt)

    if(!jwt){
        return res.redirect('/login')
    }

    const token = getUser(jwt)
    console.log('userjwt',token)
    if(!user){
        return res.redirect('/login')
    }
    req.token = token
     next()

}

async function checkAuth(req,res,next) {
    const jwt = req.cookies?.jwt
    // console.log(sessionID)

    const token  = getUser(jwt)
    req.token = token
     next()

     
    
}

module.exports = {restrictToLoggedInUserOnly,checkAuth}