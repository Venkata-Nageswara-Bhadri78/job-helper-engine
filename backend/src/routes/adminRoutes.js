const express = require('express');
const router = express.Router();

const adminControllers = require("../controllers/adminControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/jobs", authMiddleware.verifyToken, roleMiddleware.isAdmin, adminControllers.fetchAllJobs);
router.patch("/jobs/:id/approve", authMiddleware.verifyToken, roleMiddleware.isAdmin, adminControllers.updateJobStatus);
router.patch("/jobs/:id/reject", authMiddleware.verifyToken, roleMiddleware.isAdmin, adminControllers.updateJobStatus);
router.delete("/jobs/:id/delete", authMiddleware.verifyToken, roleMiddleware.isAdmin, adminControllers.deletePostedJob);
module.exports = router;