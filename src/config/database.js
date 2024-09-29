const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ankurishiva:Yd2KvykP6Dp8dqQR@clustersv.wr1do.mongodb.net/nodesv");
};

module.exports = connectDB
