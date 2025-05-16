//import express lib
const express = require('express');

//utilize express to create router object
const router = express.Router();

//import verifyJWT
const verifyJWT = require('../middleware/auth');

//import createPost
const { createPost } = require('../controllers/postController')

router.post('/create', verifyJWT, createPost);

//export the router object
module.exports = router;