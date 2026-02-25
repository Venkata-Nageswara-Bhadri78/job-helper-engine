
const db = require("../config/db");

exports.registerUser = (userData, callback) => {
    const query = `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`;
    db.run(query, [userData.name, userData.email, userData.password, userData.role], (err) => {
        if(err){
            return callback(err);
        }
        return callback(null);
    });
}