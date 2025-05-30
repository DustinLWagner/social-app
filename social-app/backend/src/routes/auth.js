//import express lib
const express = require('express');

//utilize express to create router object
const router = express.Router();

//import register and login FUNCTIONS from authController.js
const { register, login } = require('../controllers/authController');

const verifyJWT = require('../middleware/auth');
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// "When a POST request comes in to /register, run the register function to handle it."
//This is relative to where this router is mounted in your server.js
//Routes
router.post('/register', register);
router.post('/login', login);


router.get('/profile', verifyJWT, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { id: true, username: true }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});
//export the router object
module.exports = router;