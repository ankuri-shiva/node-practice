const mongoose = require("mongoose");

const connectDB = async () => {
    //await mongoose.connect("mongodb+srv://ankurishiva:Yd2KvykP6Dp8dqQR@clustersv.wr1do.mongodb.net/");
    await mongoose.connect("mongodb://ankurishiva:Yd2KvykP6Dp8dqQR@clustersv-shard-00-00.wr1do.mongodb.net:27017,clustersv-shard-00-01.wr1do.mongodb.net:27017,clustersv-shard-00-02.wr1do.mongodb.net:27017/?replicaSet=atlas-jdbbro-shard-0&ssl=true&authSource=admin");
    //await mongoose.connect("mongodb+srv://ankurishiva:Yd2KvykP6Dp8dqQR@clustersv.wr1do.mongodb.net/?retryWrites=true&w=majority&appName=Clustersv");
    //const pass = "63eYW7i1CqhUurXX";
    //await mongoose("mongodb+srv://ankurishiva:63eYW7i1CqhUurXX@cluster01.6artw.mongodb.net/");
    //await mongoose.connect("mongodb+srv://ankurishiva:63eYW7i1CqhUurXX@cluster01.6artw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01");
};
module.exports = connectDB
