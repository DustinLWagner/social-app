//import express lib
const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '../../uploads') });

//create router object
const router = express.Router();

//import verifyJWT
const verifyJWT = require('../middleware/auth');
//import createPost
const { createPost } = require('../controllers/postController');
// get feeds
const { getFeed, getUserFeed } = require('../controllers/feedController');
// POST api/posts/create - protected with file upload
router.post('/create', verifyJWT, upload.single('media'), createPost);
//GET /api/posts/feed - public
router.get('/feed', getFeed);
// GET /api/users/:id/posts
router.get('/users/:id/posts', getUserFeed);

//export the router object
module.exports = router;