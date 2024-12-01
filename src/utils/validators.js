const validator = require("validator");

const validateSignupData = (req) => {

  
        const {firstName, lastName, email, password} = req.body;
            if(!firstName || !lastName){
                throw new Error("please enter the name");
            } else if(firstName.length < 4 || firstName.length > 50) {
                throw new Error("firsName should be 4 to 50 characters");
            } else if(lastName.length < 4 || lastName.length > 50) {
                throw new Error("lastName should be 4 to 50 characters")
            } else if(!validator.isEmail(email)){
                throw new Error("Please enter the valid EmailId");
            }else if(!validator.isStrongPassword(password)){
                throw new Error("Please enter the strong password")
            }
        
    };

    const validateUserData = (req) => {
        const ALLOW_EDITABLE_FILEDS = ["firstName", "lastName", "age", "gender", "about", "skills"];

        return Object.keys(req.body).every(field => ALLOW_EDITABLE_FILEDS.includes(field));  
    };

    module.exports = {
        validateSignupData,
        validateUserData
    };
