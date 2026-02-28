const jobModels = require('../models/jobModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createJob = (req, res) => {
    const { title, company_name, description, apply_link, category, location, expiry_date } = req.body;
    const user_id = req.user.id;
    console.log(user_id);
    // Validation Check
    if(!title){
        return res.status(400).json({success: false, message: "JOB TITLE SHOULD NOT BE EMPTY"})
    }
    if(!company_name){
        return res.status(400).json({success: false, message: "JOB TITLE SHOULD NOT BE EMPTY"})
    }
    if(!description || description.length<50){
        return res.status(400).json({success: false, message: "JOB DESCRIPTION SHOULD BE ATLEAST 50 CHARS"})
    }
    if(!apply_link){
        return res.status(400).json({success: false, message: "JOB APPLY LINK SHOULD NOT BE EMPTY"})
    }
    if(!category){
        return res.status(400).json({success: false, message: "JOB CATEGORY SHOULD NOT BE EMPTY"})
    }
    if(!expiry_date){
        return res.status(400).json({success: false, message: "JOB EXPIRE DATE SHOULD NOT BE EMPTY"})
    }
    
    jobModels.getApplyLink(apply_link, (err, isPresent) => {
        if(err){
            return res.status(501).json({success: false, message: "ERROR IN CHECKING APPLY LINK"});
        }
        if(isPresent){
            return res.status(401).json({success: false, message: "JOB ALREADY POSTED BY SOMEONE ELSE"});
        }

        const jobData = {title, company_name, description, apply_link, category, location, user_id, expiry_date}
        jobModels.createJob(jobData, (err) => {
            if(err){
                return res.status(500).json({success: false, message: "ERROR IN POSTING THE JOB - TRY AGAIN"})
            }
            return res.status(200).json({success: true, message: "JOB POSTED SUCCESSFULLY"})
        })
    })
}

exports.getAllJobsById = (req, res) => {
    const user_id = req.user.id;
    jobModels.getAllJobsById(user_id, (err, data) => {
        if(err){
            return res.status(501).json({success: false, data: null, message: "ERROR IN GETTING JOBS POSTED BY YOU"})
        }
        if(!data){
            return res.status(404).json({success: false, data: null, message: "NO JOBS POSTED BY YOU"});
        }
        return res.status(200).json({success: true, data: data, message: "POSTED JOBS SUCESSFULLY EXTRACTED"})
    })
}