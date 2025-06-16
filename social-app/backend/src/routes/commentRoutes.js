//import express lib
const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '../../uploads') });

//create router object
const router = express.Router();
//import verifyJWT
const verifyJWT = require('../middleware/auth');

//import createComment
const { createComment, getCommentsByPostId } = require('../controllers/commentController');
// POST api/comments
router.post('/', verifyJWT, upload.single('media'), createComment);
// GET api/comments/:postId
router.get('/:postId', getCommentsByPostId);

//export the router
module.exports = router;