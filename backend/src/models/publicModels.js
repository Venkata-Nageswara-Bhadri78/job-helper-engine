const db = require("../config/db");

exports.getAllJobsByAllUsers = (callback) => {
    const query = `SELECT * FROM jobs where status != 'PENDING'`;
    db.all(query, (err, data) => {
        if(err){
            return callback(err, null);
        }
        if(!data){
            return callback(null, null);
        }
        return callback(null, data);
    })
}
exports.getJobDetailsById = (job_id, callback) => {
    const query = `SELECT * FROM jobs where id = ?`;
    db.get(query, [job_id], (err, row) => {
        if(err){
            return callback(err, null);
        }
        return callback(null, row);
    })
}