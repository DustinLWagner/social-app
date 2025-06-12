//import express lib
const express = require('express');
const verifyJWT = require('../middleware/auth');
//utilize express to create router object
const router = express.Router();
const followController = require('../controllers/followController');
const unFollowController = require('../controllers/unFollowController');
const listFollowers = require('../controllers/listFollowersController');
const listFollowing = require('../controllers/listFollowingController');



router.post('/users/:id/follow', verifyJWT, followController);
router.post('/users/:id/unfollow', verifyJWT, unFollowController);
router.get('/users/:id/followers', listFollowers);
router.get('/users/:id/following', listFollowing);


//export the router
module.exports = router;
