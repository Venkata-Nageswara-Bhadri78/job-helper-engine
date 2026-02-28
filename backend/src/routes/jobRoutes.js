const express = require('express');
const router = express.Router();

const jobsControllers = require('../controllers/jobsController');
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.verifyToken, jobsControllers.createJob);
router.get("/", authMiddleware.verifyToken, jobsControllers.getAllJobsById);
module.exports = router;