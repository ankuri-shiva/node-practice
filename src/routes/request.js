const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js")


//send connenction api
requestRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
    res.send(user.firstName + " sent connection request");
});

module.exports = requestRouter;