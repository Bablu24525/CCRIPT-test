const jwt = require('jsonwebtoken')
const Models = require('../db/model')

async function authenticateUserSession(req, res, next) {
    try {
        let header = req.headers['authorization']
        let token = header && header.split(' ')[1]
        if(token == null){
            return res.status(400).json({
                success: false,
                message: "Please provide access token"
            })
        }
        else{
            let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            let session_hash = decodedToken.session_hash;
            if (!session_hash) {
                return res.status(400).json({ success: false, message: 'Could not authenticate, Invalid auth token' });
            }
            else{
                let user_session = await Models.UserSession.findOne({session_hash:session_hash})
                if(user_session && user_session._id){
                    req.user_name= user_session.user_name
                    req.session_hash= user_session.session_hash
                    next()
                }
                else{
                    return res.status(400).json({
                        success:false,
                        message:"Session Expired"
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Invalid or Expired Token"
        })
    }
}

module.exports = {
    authenticateUserSession
}