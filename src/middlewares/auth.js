const adminAuth = ("/admin", (req, res, next) => {
    const token = "abcde";
    const authorization = token === "xyz";
    if(!authorization) {
        res.status(401).send("Unauthorised request")
    } else {
        next()
    }
 });
 const userAuth = ("/user", (req, res, next) => {
    const token = "abcde";
    const authorization = token === "xyz";
    if(!authorization) {
        res.status(401).send("Unauthorised request")
    } else {
        next()
    }
 });

 module.exports = {adminAuth, userAuth}
