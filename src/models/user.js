const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
        minLength:3,
        maxLength:255,
    },
    lastName : {
        type : String
    },
    email: {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowerCase : true,
    },
    password: {
        type : String,
        required: true,
    },
    gender: {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        },
    },
    age : {
        type: Number,
        min:18,
    },
    profileUrl: {
        type: String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    skills :{
        type:[String]
    },
    about : {
        type : String,
        default : "This is default about about user"
    },

},
{
    timestamps : true
}); 

module.exports = mongoose.model("User", userSchema);