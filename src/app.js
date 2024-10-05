const express = require("express");
const User = require("./models/user.js");
const connectDB = require("./config/database.js");
const app = express();
//onst {adminAuth, userAuth} = require("./middlewares/auth.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user =  new User(req.body);
    console.log(user)

    try {
           //creating the new instance of the user model
            await user.save();
            console.log(req.body)
            res.send("user added successfully");
    } catch(err) {
        res.status().send("some error occured" + err.message);
    }
});

// GET user API

app.get("/users", async (req, res) => {
    const userName = req.body.firstName;
    console.log(userName)
    try {
        const user = await User.find({firstName: userName});
        if(user.length === 0){
            res.status(400).send("user not found")
        } else {
        res.send(user);
        }
    } catch(err) {
        res.status(400).send("something went wrong");
    }
})


// get all users

app.get("/users/all", async (req, res) => {
       
    try{
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(400).send("something went wrong");
    }
});

//delete the user

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
            const user = await User.findByIdAndDelete({_id : userId});
            res.send("user deleted successfully");
    } catch(err) {
        res.status(400).send("something went wrong");
    }
});

//update the user 

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after"});
        res.send(user);
    } catch(err) {
        res.status(400).send("something went wrong");
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
