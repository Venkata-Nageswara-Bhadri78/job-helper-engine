const db = require("../config/db");

exports.createJob = (jobData, callback) => {
    const {title, company_name, description, apply_link, category, location, user_id, expiry_date} = jobData;
    const query = `INSERT INTO jobs (title, company_name, description, apply_link, category, location, posted_by, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    db.run(query, [title, company_name, description, apply_link, category, location, user_id, expiry_date], (err) => {
        if(err){
            return callback(err);
        }
        return callback(null);
    })
}
exports.getApplyLink = (apply_link, callback) => {
    const query = `Select * from jobs where apply_link = ?`;
    db.get(query, [apply_link], (err, row) => {
        if(err){
            return callback(err, false);
        }
        if(!row){
            return callback(null, false);
        }
        return callback(null, true);
    })
}
exports.getAllJobsById = (user_id, callback) => {
    const query = `Select * from jobs where posted_by = ?;`;
    db.all(query, [user_id], (err, rows) => {
        if(err){
            return callback(err, null);
        }
        return callback(null, rows);
    })
}