require('dotenv').config();

//import express
const express = require('express');

//main app object to handle all routing/middleware/etc
const app = express();

//import auth.js router
const authRoutes = require('./routes/auth');

//parse incoming request from the client with JSON, attach the parsed data to req.body
app.use(express.json());

// for routes from /api/auth use auth.js routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
console.log('Starting server...');
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});