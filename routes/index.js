 

"use strict";
const apiController = require("./api"),
authController = require("./auth"),
  bodyParser = require("body-parser");

function init(app) {

  // parse application/json
  app.use(bodyParser.json());

  app.use("/", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE ,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization"
    );
    next();
  });

  app.get("/", function (req, res) {
    res.send("<--- CCript-test app --->");
  });

  app.use("/api", apiController);
  app.use("/auth", authController);
}

module.exports = {
  init: init,
};
