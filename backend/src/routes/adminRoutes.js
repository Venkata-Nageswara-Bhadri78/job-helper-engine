const express = require('express');
const router = express.Router();

const adminControllers = require("../controllers/adminControllers");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/jobs", authMiddleware.verifyToken, adminControllers.fetchAllJobs);
router.patch("/jobs/:id/approve", authMiddleware.verifyToken, adminControllers.updateJobStatus);
router.patch("/jobs/:id/reject", authMiddleware.verifyToken, adminControllers.updateJobStatus);
router.delete("/jobs/:id/delete", authMiddleware.verifyToken, adminControllers.deletePostedJob);
module.exports = router;