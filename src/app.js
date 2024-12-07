const express = require("express");
const User = require("./models/user.js");
const connectDB = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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

app.get("/feed", async (req, res) => {
       
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
        const ALLOW_UPDATES = ["userId","gender", "skills","email", "password"];
        const isAllowed = Object.keys(data).every(k => ALLOW_UPDATES.includes(k));
        if(!isAllowed) {
            throw new Error("update not allowed");
        };

        const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after",
            runValidators: true,
        });
        if(!user) {
            throw new Error("Invalid user")
        } else {
            res.send(user);
        }
    } catch(err) {
        res.status(400).send("Error: " + err.message);
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
