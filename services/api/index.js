
const md5 = require('md5');
const Models = require('../../db/model')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


async function addAppointmentt(req,res){
    try {
        let {
            start,
            end,
            reason
        } = req.body
        let obj = {
            start: Date(start),
            end: Date(end),
            reason,
            user_name: req.user_name
        }
        let appointment = await Models.Appointment(obj).save()
        if(appointment && appointment._id){
            return res.status(200).json({
                success: true,
                message: "appointment added"
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: "something went wrong adding appointment please try again later"
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

async function logOut(req,res){
    try {
        let response = await Models.UserSession.deleteOne({
            session_hash: req.session_hash,
        });
        if(response.deletedCount>0)
        {
            return res.status(200).json({
                success: true,
                message: "Log out Successfull"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Could Not Log Out"
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

async function getAppointments(req,res){
    try {
        let appointments = await Models.Appointment.find({user_name:req.user_name})
        return res.status(200).json({
            success: true,
            data: appointments
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Something went wrong please try again later"
        })
    }
}

module.exports = {
    addAppointmentt,
    logOut,
    getAppointments
}