
const md5 = require('md5');
const Models = require('../../db/model')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


async function signUp(req,res){
    try {
        let {
            user_name,
            password
        } = req.body
        let obj = {
            user_name,
            password:md5(password)
        }
        let user = await Models.User(obj).save()
        if(user && user._id){
            return res.status(200).json({
                success:true,
                message:"Successfully signed up"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Something went wrong please try again later"
        })
    }
}

async function logIn(req,res){
    try {
        let {
            user_name,
            password
        } = req.body
        let response = await Models.User.findOne({
            user_name: user_name,
            password: md5(password.toString()),
        })
        console.log(user_name)
        console.log(response)
        if(response && response._id){
            let hash = md5(new Date() + Math.random());
            let access_token = jwt.sign({ session_hash: hash }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
            let refresh_token = jwt.sign({ session_hash: hash }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5m'});
            let obj = {
                session_hash: hash,
                user_name: response.user_name
            }
            let user_session = await Models.UserSession(obj).save()
            if(user_session && user_session._id){
                return res.status(200).json({
                    success: true,
                    message: "Log In successfull",
                    access_token,
                    refresh_token
                })
            }
            else{
                return res.status(400).json({
                    success: false,
                    message: "Session could not be saved please try again later"
                })
            }
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Wrong User Name or Password provided"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Something went wrong please try again later"
        })
    }
}

async function getToken(req,res){
    try {
        let header = req.headers['authorization']
        let token = header && header.split(' ')[1]
        if(token == null){
            return res.status(400).json({
                success: false,
                message: "Please provide refresh token"
            })
        }
        else{
            let decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            let session_hash = decodedToken.session_hash;
            if (!session_hash) {
                return res.status(400).json({ success: false, message: 'Could not authenticate, Invalid auth token' });
            }
            else{
                console.log(session_hash)
                let user_session = await Models.UserSession.findOne({session_hash:session_hash})
                if(user_session && user_session._id){
                    let access_token = jwt.sign({ session_hash: session_hash }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
                    return res.status(200).json({
                        success:true,
                        message:"New Token",
                        access_token
                    })
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
            message:"Expired Or Invalid Token"
        })
    }
}


module.exports = {
    signUp,
    logIn,
    getToken
}