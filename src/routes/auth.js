const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const {validateSignupData} = require("../utils/validators.js");
const authRouter = express.Router();



authRouter.post("/signup", async (req, res) => {
   try {
       //validate the data

       const {firstName, lastName, email, password} = req.body;
           validateSignupData(req);

           //encrypt the password
           const hashedPassword = await bcrypt.hash(password, 10);
           console.log(hashedPassword)

          //creating the new instance of the user model
          const user =  new User({
           firstName, lastName, email, password : hashedPassword
          });
           await user.save();
           res.send("user added successfully");
   } catch(err) {
       res.status(400).send("Error " + err.message);
   }
});


//login api

authRouter.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
    
        const user = await User.findOne({ email: email });
        
        
        if(!user) {
            throw new Error("Invalid credintials");
        };
        const isPaswordCorrect = await user.validatePassword(password);

        if(isPaswordCorrect){

            //create the JWT Token
            const jwtToken = await user.getJwt()
            //console.log(jwtToken);


            //Add the token to the cookie send the respose back to the server
            res.cookie("token", jwtToken, {
                expires: new Date(Date.now() + 8 * 3600000),
            });

            res.send("Login successfull!!");
        } else {
            throw new Error("Invalid credintials");
        };
    }catch(err) {
        res.status(400).send("Error " + err.message);
    }
    
});

module.exports = authRouter;
