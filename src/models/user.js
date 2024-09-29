const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName : {
        type : String
    },
    email: {
        type : String
    },
    password: {
        tyep : String
    },
    gender: {
        tyep : String
    },

}); 

module.exports = mongoose.model("User", userSchema);