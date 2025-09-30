require('dotenv').config();
const cors = require('cors');

const cookieParser = require('cookie-parser');

//import express
const express = require('express');
const app = express(); //(main app object to handle all routing/middleware/etc)

const requireAuth = require('./middleware/auth')
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//import auth.js router
const authRoutes = require('./routes/auth');

//import  verifyJWT
const verifyJWT = require('./middleware/auth');

//restrict cors to my frontend addy only
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // replace with your server IP or domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true //cookies/JWT
};

//import post route
const postRoutes = require('./routes/postRoutes');

//likes routes
const likesRoutes = require('./routes/likesRoutes');

//followRoutes
const followRoutes = require('./routes/followRoutes');

//userRoutes
const userRoutes = require('./routes/userRoutes');

//commentRoutes
const commentRoutes = require('./routes/commentRoutes');


app.use(cors(corsOptions));
app.use(cookieParser());

//parse incoming request from the client with JSON, attach the parsed data to req.body
app.use(express.json());

//for protected (auth required)
app.use(
    '/protected',
    requireAuth, (req, res, next) => {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        next();
    }, express.static(path.join(__dirname, '../../frontend/protected')),
);

// for routes from /api/auth
app.use('/api/auth', authRoutes);

//create post route
app.use('/api/posts', postRoutes);

//follow routes
app.use('/api', followRoutes);

//userRoutes
app.use('/api/users', userRoutes);

//commentRoutes
app.use('/api/comments', commentRoutes);

//likesRoutes
app.use('/api/likes', likesRoutes);

// Auth check endpoint to verify JWT and return user info
app.get('/api/auth/profile', verifyJWT, (req, res) => {
    res.status(200).json({ message: 'Access Granted', userId: req.userId });
});

//for public (no auth required)
app.use(
    express.static(path.join(__dirname, '../../frontend/public'))
);

//avoid 404 on favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).end());

const PORT = process.env.PORT || 3000;
console.log('Starting server...');

// 0.0.0.0 listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on Port ${PORT}`);
});