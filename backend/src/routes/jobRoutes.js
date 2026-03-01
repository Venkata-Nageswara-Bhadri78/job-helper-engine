const express = require('express');
const router = express.Router();

const jobsControllers = require('../controllers/jobsController');
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.verifyToken, jobsControllers.createJob);
router.get("/", authMiddleware.verifyToken, jobsControllers.getAllJobsById);

router.get("/all", authMiddleware.verifyToken, jobsControllers.getAllJobsByAllUsers);
router.get("/:id", authMiddleware.verifyToken, jobsControllers.getOneJobById);

module.exports = router;