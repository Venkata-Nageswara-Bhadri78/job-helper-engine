
const db = require("../config/db");

exports.registerUser = (userData, callback) => {
    const query = `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`;
    db.run(query, [userData.name, userData.email, userData.password, userData.role], (err) => {
        if(err && err.code === 'SQLITE_CONSTRAINT'){
            return callback(new Error("Email already exists"));
        }
        if(err){
            return callback(err);
        }
        return callback(null);
    });
}

exports.loginUser = ({ email }, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, row) => {
        if(err){
            return callback(err, null);
        }
        if(!row){
            return callback(null, null);
        }
        return callback(null, row);
    })
}

exports.getUserDetailsById = (userId, callback) => {
    const query = `SELECT id, name, email, role FROM users WHERE id = ?`;
    
    db.get(query, [userId], (err, row) => {
        if(err){
            return callback(err, null);
        }
        return callback(null, row);
    });
}