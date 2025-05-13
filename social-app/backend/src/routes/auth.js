//import express lib
const express = require('express');

//utilize express to create router object
const router = express.Router();

//import register and login FUNCTIONS from authController.js
const { register, login } = require('../controllers/authController');

// "When a POST request comes in to /register, run the register function to handle it."
//This is relative to where this router is mounted in your server.js
//Routes
router.post('/register', register);
router.post('/login', login);

//export the router object
module.exports = router;