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

app.get('/', (req, res) => res.send('Server running'));

app.use('/auth', authRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});