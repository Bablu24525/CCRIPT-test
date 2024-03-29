// Import packages
const express = require("express")
                require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const initMongoDB = require("./db");
const routes = require("./routes")


// ***************************************************
// middlewares 
// ***************************************************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
// handling CORS 
app.use(cors());

// routes 
routes.init(app);

initMongoDB();

// ***************************************************
// Creating && Starting Server 
// ***************************************************
const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
    console.log(`Server Started at Port: ${port}`);
});