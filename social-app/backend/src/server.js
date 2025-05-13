require('dotenv').config();
const cors = require('cors');



//import express
const express = require('express');

//main app object to handle all routing/middleware/etc
const app = express();

//import auth.js router
const authRoutes = require('./routes/auth');

//import  verifyJWT
const verifyJWT = require('./middleware/auth')

//restrict cors to my frontend addy only
app.use(cors({ origin: 'http://127.0.0.1:5500' }));


//parse incoming request from the client with JSON, attach the parsed data to req.body
app.use(express.json());

// for routes from /api/auth use auth.js routes
app.use('/api/auth', authRoutes);

//middlewareJWT
function handler(req, res) {
    res.status(200).json({ message: 'Access Granted', userId: req.userId })
};

app.get('/profile', verifyJWT, handler);


const PORT = process.env.PORT || 3000;
console.log('Starting server...');
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});