const express = require('express');
const router = express.Router();

const jobsControllers = require('../controllers/jobsController');
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.verifyToken, jobsControllers.createJob);
router.get("/", authMiddleware.verifyToken, jobsControllers.getAllJobsById);

router.get("/:id", authMiddleware.verifyToken, jobsControllers.getOneJobById);
router.delete("/:id", authMiddleware.verifyToken, jobsControllers.deleteJobById);

module.exports = router;