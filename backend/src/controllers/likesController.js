const { response } = require('express');
const prisma = require('../utils/prisma');
//Liking Comments
async function createLike(req, res) {
    //checks for JWT
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { targetId, targetType } = req.body;
        //validate targetType and targetId
        if (!targetId || isNaN(Number(targetId)) || !targetType || targetType !== 'post' && targetType !== 'comment') {
            return res.status(400).json({ error: 'Valid Id Required' });
        }
        //build data object and assign post or comment ID to target
        const data = {
            userId: req.userId,
            [targetType === 'post' ? 'postId' : 'commentId']: Number(targetId),
        }

        //api call
        await prisma.like.create({ data });

        return res.status(200).json({ message: 'Liked!' });

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Already Liked' });
        }
        console.error('Likes error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function deleteLike(req, res) {
    //checks for JWT
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { targetId, targetType } = req.query;

        if (!targetId || !targetType) {
            return res.status(400).json({ error: 'Missing targetId or targetType' });
        }

        //build data object filtering what to delete
        const where = {
            userId: req.userId,
            [targetType === 'post' ? 'postId' : 'commentId']: Number(targetId),
        };

        const result = await prisma.like.deleteMany({ where });
        //check result for status, if not liked then 404
        if (result.count === 0) {
            return res.status(404).json({ error: 'Not Found' })
        }
        //return 200 and unlike message
        return res.status(200).json({ message: 'Unliked!' })
    } catch (error) {
        console.error('Unlike error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//getLikesCount

async function getLikesCount(req, res) {
    const { targetId } = req.query;

    if (!targetId || isNaN(Number(targetId))) {
        return res.status(400).json({ error: 'Valid postId required' });
    }

    try {
        const likesCount = await prisma.like.count({
            where: {
                postId: Number(targetId)
            }
        });

        res.json({ count: likesCount });

    } catch (error) {
        console.error('Error fetching likes count', error);
        res.status(500).json({ error: 'Failed to fetch likes count' });
    }
}



// async function getLikesByPostId(req,res){}
//async function getLikesByCommentId(req,res){}



module.exports = { createLike, deleteLike, getLikesCount /*, getLikesByPostId, getLikesByCommentId*/ }