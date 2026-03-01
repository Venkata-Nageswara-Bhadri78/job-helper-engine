const db = require("../config/db");

exports.getAllJobsByAllUsers = (callback) => {
    const query = `SELECT * FROM jobs WHERE status = 'approved' AND is_deleted = 0 AND expiry_date > CURRENT_TIMESTAMP`;
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
    const query = `SELECT * FROM jobs WHERE id = ? AND status = 'approved' AND is_deleted = 0 AND expiry_date > CURRENT_TIMESTAMP`
    db.get(query, [job_id], (err, row) => {
        if(err){
            return callback(err, null);
        }
        return callback(null, row);
    })
}