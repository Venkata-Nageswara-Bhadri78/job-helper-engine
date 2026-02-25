const authModel = require('../models/authModels');

const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    // Check all Validations
    if(name.length<=2){
        return res.status(401).json({success: false, message: "Name length should be atleast 2"});
    }
    if(!email.includes("@gmail.com")){
        return res.status(401).json({success: false, message: "Enter a proper email address"});
    }
    if(password.length<8){
        return res.status(401).json({success: false, message: "password length should be atleast 8"});
    }
    if(!["user", "admin"].includes(role)){
        return res.status(401).json({success: false, message: "Invalid Role"});
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = {
        name,
        email,
        password: hashedPassword,
        role
    };

    // Add it to Models
    authModel.registerUser(userData, (err) => {
        if(err){
            return res.status(500).json({success: false, message: err.message});
        }
        return res.status(200).json({success: true, message: "Registration Successfull"});
    });
}