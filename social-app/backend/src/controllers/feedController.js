//get feed controler

const prisma = require("../utils/prisma");
//fetch global feed
async function getFeed(req, res) {

    try {
        const posts = await prisma.post.findMany({ //query all posts
            orderBy: [
                // sort by createdAt, newest first
                { createdAt: 'desc' }
            ],
            include: {
                author: {// include username of author for each post
                    select: {
                        username: true,
                        id: true
                    }
                },
            },

        });
        res.status(200).json(posts); //return list of posts
    } catch (error) {
        console.error('Error fetching global feed:', error);
        res.status(500).json({ error: 'Failed to fetch feed.' });
    }
};

async function getUserFeed(req, res) {

    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user id' });
    }


    try {
        const posts = await prisma.post.findMany({ //query all posts
            where: { authorId: userId },
            include: {
                author: {
                    select: {
                        username: true,// include username of author for each post
                        id: true
                    },
                },
            },
            orderBy: [
                // sort by createdAt, newest first
                { createdAt: 'desc' }
            ],

        });
        res.status(200).json(posts); //return list of posts
    } catch (error) {
        console.error('Error fetching global feed:', error);
        res.status(500).json({ error: 'Failed to fetch feed.' });
    }
};


module.exports = { getFeed, getUserFeed };