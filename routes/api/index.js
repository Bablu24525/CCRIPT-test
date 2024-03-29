 

"use strict";

const express = require("express");
const userApiServices = require("../../services/api");
const { authenticateUserSession } = require("../../middlewares");

let router = express.Router();

router.post("/add", authenticateUserSession, userApiServices.addAppointmentt);
router.get("/log-out",authenticateUserSession, userApiServices.logOut)
router.get("/get",authenticateUserSession, userApiServices.getAppointments)

module.exports = router;
