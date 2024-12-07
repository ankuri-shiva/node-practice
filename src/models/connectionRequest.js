const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema({

    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User", // reference to the user collection
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User",
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps:true
});

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    // check if fromUserId is same as touUerId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself");
    };
    next();
});

connectionRequestSchema.index({fromUserId:1, toUserId:1});

const connectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = connectionRequestModel;