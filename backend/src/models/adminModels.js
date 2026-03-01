const db = require("../config/db");

exports.getJobsByStatus = (status, callback) => {
    let query = "SELECT * FROM jobs";
    let array = [];

    if(status==undefined){
        query += ";";
    }
    else{
        query += " where STATUS = ?;";
        array.push(status)
    }
    db.all(query, array, (err, rows) => {
        if(err){
            return callback(err, null);
        }
        return callback(err, rows);
    })
}

exports.updateJobStatus = (job_id, newStatus, callback) => {
    const query = `UPDATE jobs SET status = ? where id = ?`;
    db.run(query, [newStatus, job_id], (err) => {
        if(err){
            return callback(err);
        }
        return callback(null);
    });
}

exports.deletePostedJob = (job_id, callback) => {
    const query = `DELETE FROM jobs where id = ?`;
    db.run(query, [job_id], (err) => {
        if(err){
            return callback(err);
        }
        return callback(null);
    })
}