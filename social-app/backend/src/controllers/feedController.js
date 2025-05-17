//get feed controler

const prisma = require("../utils/prisma");

async function getFeed(req, res) {

    const posts = await prisma.post.findMany({ //query all posts
        orderBy: [
            // sort by createdAt, newest first
            { createdAt: 'desc' }
        ],
        include: {
            author: {// include username of author for each post
                select: { username: true }
            },
        },

    });
    res.status(200).json(posts); //return list of posts
};

module.exports = { getFeed };