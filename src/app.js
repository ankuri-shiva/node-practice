const express = require("express");
const app = express();

// dynamic routing
 app.use("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params)
    res.send("data successfully saved in database");
 })

 app.use("/a/", (req, res) => {
    res.send("Home..");
})

app.listen(7777, () => {
    console.log("server is running on port no :7777")
});