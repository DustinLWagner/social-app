//import express lib
const express = require('express');
const verifyJWT = require('../middleware/auth');
//utilize express to create router object
const router = express.Router();
const followController = require('../controllers/followController');
const unFollowController = require('../controllers/unFollowController');


router.post('/users/:id/follow', verifyJWT, followController);
router.post('/users/:id/unfollow', verifyJWT, unFollowController);

//export the router
module.exports = router;
