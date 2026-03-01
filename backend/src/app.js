require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import required route files here
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require("./routes/adminRoutes");

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/public', publicRoutes);
app.use('/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});