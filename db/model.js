
const mongoose = require("mongoose"),
  schemas = require("./schema");

/* Exporting Models */
module.exports = {
  User: mongoose.model("User", schemas.User),
  UserSession: mongoose.model("UserSession", schemas.UserSession),
  Appointment: mongoose.model("Appointment", schemas.Appointment),
};
  