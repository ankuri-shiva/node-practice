const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName gender age skills profileUrl about"

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id, status : "interested"
        }).populate("fromUserId", "firstName lastName");

        res.json({message: "connection requests fetched successfully", 
            data: connectionRequests,
        })
    } catch(err) {
        res.status(404).send("ERROR: " + err.message);
    };
});


userRouter.get("/user/connections", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status : "accepted"},
                {fromUserId : loggedInUser._id, status : "accepted"}
            ],
        }).populate("fromUserId", "firstName lastName").populate("toUserId", "firstName lastName");

        const data = connections.map((each) => {
            if(each.fromUserId._id.toString()  === loggedInUser._id.toString()){
                return each.toUserId
            } else {
                return each.fromUserId
            }
        })
        

        res.json(data);

    } catch(err) {
        res.status(404).send("ERROR: " + err.message);
    }
});


// /feed api

userRouter.get("/users/feed", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;

        // find all connections (send + received)
        const connectionRequests = await ConnectionRequest.find({
            $or: [
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id,}
        ]
        }).select("fromUserId toUserId").populate("fromUserId", "firstName").populate("toUserId", "firstName");

        const hideFromFeedUsers = new Set();
        connectionRequests.forEach((eachReq) => {
            hideFromFeedUsers.add(eachReq.toUserId._id.toString());
            hideFromFeedUsers.add(eachReq.fromUserId._id.toString());
        });
        const users = await User.find({
            $and: [
                {_id :{$nin : Array.from(hideFromFeedUsers)}},
                {_id : {$ne: loggedInUser._id}},
        ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        //console.log(users)
        res.json(users);

    }catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = userRouter;