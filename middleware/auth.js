const {getUser} = require('../services/Auth')
async function restrictToLoggedInUserOnly(req,res,next) {
    const sessionID = req.cookies?.sessionid
    // console.log(sessionID)

    if(!sessionID){
        return res.redirect('/login')
    }

    const user = getUser(sessionID)
    if(!user){
        return res.redirect('/login')
    }
    req.user = user
     next()

}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Check if the user is authenticated and redirect to login if not
 * @param {Object} params - an object with properties: req, res, next
 * @returns {Promise<void>}
 */
/******  ade2ae79-10fc-4ef8-9716-4cf8211f2891  *******/
async function checkAuth(req,res,next) {
    const sessionID = req.cookies?.sessionid
    // console.log(sessionID)

    const user = getUser(sessionID)
    req.user = user
     next()
    
}

module.exports = {restrictToLoggedInUserOnly,checkAuth}