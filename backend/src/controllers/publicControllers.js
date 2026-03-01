const publicModels = require("../models/publicModels");

exports.getAllJobsByAllUsers = (req, res) => {
    publicModels.getAllJobsByAllUsers((err, data) => {
        if(err){
            return res.status(500).json({success: false, data: null, message: "ERROR IN GETTING ALL JOBS INFO"});
        }
        if(!data){
            return res.status(404).json({success: false, data: null, message: "NO JOBS POSTED BY ANYONE"});
        }
        return res.status(200).json({success: true, data: data, message: "JOB DATA FOUND"})
    })
}

exports.getJobDetailsById = (req, res) => {
    const job_id = req.params.id;
    publicModels.getJobDetailsById(job_id, (err, data) => {
        if(err){
            return res.status(500).json({success: false, data: null, message: "ERROR IN GETTING THE JOB DETAILS"});
        }
        if(!err && !data){
            return res.status(404).json({success: false, data: null, message: "INVALID JOB ID"});
        }
        return res.status(200).json({success: true, data: data, message: "JOB DETAILS FOUND"})
    })
}