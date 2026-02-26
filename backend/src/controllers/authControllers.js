const authModel = require('../models/authModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        // Check all Validations
        if(!name || name.length<2){
            return res.status(400).json({success: false, message: "Name length should be atleast 2"});
        }
        if(!email || !email.includes("@")){
            return res.status(400).json({success: false, message: "Enter a proper email address"});
        }
        if(!password || password.length<8){
            return res.status(400).json({success: false, message: "password length should be atleast 8"});
        }
        if(!["user", "admin"].includes(role)){
            return res.status(400).json({success: false, message: "Invalid Role"});
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
            return res.status(201).json({success: true, message: "Registration Successfull"});
        });
    }
    catch(err){
        return res.status(500).json({success: false, message: "server error"});
    }
}

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Check Input Validation Clearly
    if(!email || !password){
        return res.status(400).json({success: false, message: "ALL FIELDS ARE REQUIRED"});
    }
    if(!email.includes('@')){
        return res.status(400).json({success: false, message: "INVALID EMAIL ADDRESS"});
    }
    
    authModel.loginUser({ email }, async (err, data) => {
        if(err){
            return res.status(500).json({success: false, message: err.message, data: null});
        }
        if(!data){
            return res.status(404).json({success: false, data: null, message: "NO USER FOUND"});
        }

        const isUserValid = await bcrypt.compare(password, data.password_hash);
        if(!isUserValid){
            return res.status(401).json({success: false, data: null, message: "INVALID CREDENTIALS"})
        }

        const token = jwt.sign(
            { id: data.id, role: data.role, email: data.email, name: data.name},
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({success: true, token, message: "USER LOGGED IN SUCESSFULLY"});          
    });
}

exports.getUserDetailsById = (req, res) => {
    const userId = req.user.id;
    
    authModel.getUserDetailsById(userId, (err, data) => {
        if(err){
            return res.status(500).json({success: false, message: "ERROR IN GETTING USER DATIALS", data: null});
        }
        if(!data){
            return res.status(404).json({success: false, message: "USER NOT FOUND", data: null});
        }
        const response = {
            success: true,
            data: {
                id: data.id,
                name: data.name,
                email: data.email
            },
            message: "USER DETAILS FOUND"
        }
        return res.status(200).json(response);
    })
}