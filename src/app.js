const express = require("express");
const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth.js");

// authorisation 
 app.use("/admin", adminAuth);

 app.get("/user", userAuth , (req,res) => {
    res.send("send user data");
 });

 app.post("/user/login", (req, res) => {
    res.send("user login successfully");
 })

 app.get("/admin/all", (req, res) => {
    res.send("send all data")
   
});
app.delete("/admin", (req,res) => {
        res.send("to be deleted");
})

app.listen(7777, () => {
    console.log("server is running on port no :7777")
});