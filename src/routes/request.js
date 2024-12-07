const express = require("express");

const User = require("../models/user.js");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js")


//send connenction api
requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + " sent connection request");
});

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res) => {
    
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        //status validation
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({message: "Invalid status type " + status })
        };

        //check user exist in db
        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({message: "user not found"});
        };

        //check if there is an existing user connection request

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ],
        });

        if(existingConnectionRequest) {
            return res.status(400).send({message: "connection request already exist"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId, 
            status
        });
        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status,
            data,
        });
    } catch(err) {
        res.status(400).send("ERROR: "+ err.message);
    }
});


requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const {status} = req.params
        const requestId = req.params.requestId;
        console.log(requestId)

        //validate the status
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type"});
        };

        //check if request exist

       const connectionRequest = await ConnectionRequest.findOne({
        _id : requestId,
        toUserId : loggedInUser._id,
        status : "interested",
       });
        
        if(!connectionRequest){
            return res.status(404).json({message: "connection Request not found"});
        };
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        
        res.json({message: loggedInUser.firstName + " is " + status, data});
    }catch(err) {
        res.status(404).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;