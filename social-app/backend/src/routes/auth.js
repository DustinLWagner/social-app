//import express lib
const express = require('express');

//utilize express to create router object
const router = express.Router();

//import register function from authController.js
const { register } = require('../controllers/authController');

// "When a POST request comes in to /register, run the register function to handle it."
//This is relative to where this router is mounted in your server.js
router.post('/register', register);

//export the router object
module.exports = router;
