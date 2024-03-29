 

"use strict";

const express = require("express");
const userAuthServices = require("../../services/auth");

let router = express.Router();

router.post("/sign-up", userAuthServices.signUp);
router.post("/log-in", userAuthServices.logIn);
router.get("/get-token", userAuthServices.getToken);

module.exports = router;
