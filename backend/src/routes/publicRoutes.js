const express = require('express');
const router = express.Router();

const publicControllers = require("../controllers/publicControllers");
const authControllers = require("../controllers/authControllers");

router.get("/jobs", publicControllers.getAllJobsByAllUsers)
router.get("/jobs/:id", publicControllers.getJobDetailsById);
module.exports = router;