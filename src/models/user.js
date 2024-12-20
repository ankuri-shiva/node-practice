const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        trim : true,
        lowerCase : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid EmailId: " + value)
            }
        }
    },
    password: {
        type : String,
        required: true,
        
    },
    gender: {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid: " + value)
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

//compound index
userSchema.index({firstName:1, lastName:1});

userSchema.methods.getJwt = async function() {
    const user = this;
    const token = await jwt.sign({_id : user._id}, "secreteKeyjnklofjdphkbck" , {
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    
    return isPasswordValid;
};

 




module.exports = mongoose.model("User", userSchema);