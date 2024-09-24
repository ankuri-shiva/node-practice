const express = require("express");
const app = express();



// app.use("/user", (req, res) => {
//     res.send("Order matters");
// });


app.delete( "/test", (req, res) => {
    res.send("Hello from the server is deleted");
});
// this will only handle GET call to /hello
app.get("/hello", (req, res) => {
    res.send({fistname:"shiva", lastname : "ankuri"});
});

 app.post("/user", (req, res) => {
    res.send("data successfully saved in database");
 })

 // This will match all the HTTP method API calls to /test
 app.use("/", (req, res) => {
    res.send("Home..");
})

app.listen(7777, () => {
    console.log("server is running on port no :7777")
});