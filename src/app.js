const express = require("express");
const User = require("./models/user.js");
const connectDB = require("./config/database.js");
const { validateSignupData } = require("./utils/validators.js");
const bcrypt = require("bcrypt");
const app = express();

//onst {adminAuth, userAuth} = require("./middlewares/auth.js");

app.use(express.json());

//signup api
app.post("/signup", async (req, res) => {
    
     // validate the data

     // bcrypt string "idocoiuwiffbhbubahc"

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

app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
    
        const user = await User.findOne({ email: email });
        //console.log(user)
        
        if(!user) {
            throw new Error("Invalid credintials");
        };
        console.log(user.password, password)
        const isPaswordCorrect = await bcrypt.compare(password, user.password);
        if(isPaswordCorrect){
            res.send("Login successfull!!");
        } else {
            throw new Error("Invalid credintials");
        };
    }catch(err) {
        res.status(400).send("Error " + err.message);
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
