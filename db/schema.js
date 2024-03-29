const mongoose = require("mongoose")

const User = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const UserSession = new mongoose.Schema({
    session_hash: { type: String },
    user_name: { type: String }
})

const Appointment = new mongoose.Schema({
    start: {type: Date},
    end: {type: Date},
    user_name: {type: String},
    reason: {type:String}
})
module.exports = {
    User: User,
    UserSession: UserSession,
    Appointment: Appointment
  };