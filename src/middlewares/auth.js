const jwt = require("jsonwebtoken");
const User = require("../models/user");

 const userAuth = async (req, res, next) => {
    try{
        const  cookies = req.cookies;
        const {token} = cookies;
        if(!token) {
            throw new Error("Invalid token");
        };
    
        const decodedObj = await jwt.verify(token, "secreteKeyjnklofjdphkbck");
        const {_id } = decodedObj;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("user does not exist...");
        };
        req.user = user;
        next()
    } catch(err) {
        res.status(400).send("Error: " + err.message);
    }
    
 };
 module.exports = { userAuth}
