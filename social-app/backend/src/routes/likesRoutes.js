//import express lib
const express = require('express');

//create router object
const router = express.Router();

//import verifyJWT
const verifyJWT = require('../middleware/auth');

//import funcs from likesController
const { createLike, deleteLike, getLikesByPostId, getLikesByCommentId, getLikesCount } = require('../controllers/likesController');
// POST api/likes
router.post('/', verifyJWT, createLike);
//delete like /api/likes/
router.delete('/', verifyJWT, deleteLike);

//GET like counts
//router.get('/count', getLikesCount);
// GET api/likes/:postId
//router.get('/posts/:postId', verifyJWT, getLikesByPostId);
//GET api/likes/:commentId
//router.get('/comments/:commentId', verifyJWT, getLikesByCommentId);

//export the router
module.exports = router;