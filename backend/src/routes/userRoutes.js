//import express lib
const express = require('express');
const { userInfo } = require('os');
const path = require('path');
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();
//create router object
const router = express.Router();
//GET route that uses a dynamic URL parameter :id
router.get(`/:id`, async (req, res) => {

    try {

        //get userId
        const userId = Number(req.params.id);

        // invalid id check 
        if (Number.isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid User Id' })
        };

        // Use Prisma to fetch a user by that ID
        const userInfo = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                followers: true,
                following: true,
            }
        });
        if (!userInfo) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user = {
            username: userInfo.username,
            followers: userInfo.followers.length,
            following: userInfo.following.length
        }

        // Send that user's data res.json(userData) (or an error if not found)
        res.status(200).json(user);




    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: 'Server Error' })
    }

});



//export the router object
module.exports = router;