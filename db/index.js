let mongoose = require("mongoose");
let mongo_url = process.env.MONGODB_URL;

async function initMongoDB () {
    options = {
        useNewUrlParser: true,
        useUnifiedTopology: true        
    }
    let mongo_connect = await mongoose.connect(mongo_url, options);
    if(mongo_connect) {
        console.log("MongoDB Connected!");
    } else {
        console.error("Failed to Connect to MongoDB");        
    }
}

module.exports = initMongoDB;