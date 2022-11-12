require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const xss = require('xss-clean');
const mongoose = require('mongoose');
//Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, (error) => {
    if (error) console.log(error)
    else console.log('. . . connected to database\n\n###\n')
});

app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(cors());

//Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`\n###\n\n. . . server listening on port ${PORT}`);
});