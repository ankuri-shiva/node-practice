const express = require("express");
const User = require("./models/user.js");
const connectDB = require("./config/database.js");
const app = express();
//onst {adminAuth, userAuth} = require("./middlewares/auth.js");

app.post("/signup", async (req, res) => {
    const user =  new User({
        firstName : "virat",
        lastName : "kohli",
        email : "virat@gmail.com",
        password : "virat@345",
        gender : "male",
    });

    try {
           //creating the new instance of the user model
            await user.save();
            res.send("user added successfully");
    } catch(err) {
        res.status().send("some error occured");
    }
});




connectDB()
.then(() => {
    console.log("database connection established..");
    app.listen(7777, () => {
        console.log("server is running on port no :7777")
    });
})
.catch((err) => {
    console.error("database can not be connected");
})
