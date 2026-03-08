const adminModel = require('../models/adminModels');


exports.fetchAllJobs = (req, res) => {
    const status = req.query.status;
    if(![undefined, "pending", "approved", "rejected"].includes(status)){
        return res.status(401).json({success: false, message: "INVALID STATUS TYPE"});
    }
    adminModel.getJobsByStatus(status, (err, data) => {
        if(err){
            return res.status(500).json({success: false, data: null, message: "ERROR IN FETCHING JOBS BY STATUS"})
        }
        if(!err && !data){
            return res.status(404).json({success: false, data: null, message: "NO JOBS WITH PARTICULAR STATUS"})
        }
        return res.status(200).json({success: true, data: data, message: "JOBS FOUND WITH GIVEN STATUS"})
    })
}
exports.updateJobStatus = (req, res) => {
    const job_id = req.params.id;
    let newStatus = req.path.split('/').pop();
    if(newStatus === "approve"){
        newStatus = "approved";
    }
    else if(newStatus === "reject"){
        newStatus = "rejected";
    }
    adminModel.updateJobStatus(job_id, newStatus, (err) => {
        if(err){
            return res.status(500).json({success: false, message: "ERROR IN UPDATING THE STATUS"});
        }
        return res.status(200).json({success: true, message: "JOB STATUS UPDATED SUCESSFULLY"});
    })
}
exports.deletePostedJob = (req, res) => {
    const job_id = req.params.id;
    adminModel.deletePostedJob(job_id, (err) => {
        if(err){
            return res.status(500).json({success: false, message: "ERROR IN DELETING THE JOB"})
        }
        return res.status(200).json({success: true, message: "JOB DELETED SUCESSFULLY"});
    })
}