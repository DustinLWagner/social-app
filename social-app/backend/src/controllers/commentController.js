const { response } = require('express');
const prisma = require('../utils/prisma');
//create the comment
async function createComment(req, res) {
    //checks for JWT
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    //pulls content, postId, and optional mediaUrl
    try {
        const { content, postId } = req.body;
        if (!postId || isNaN(Number(postId))) {
            return res.status(400).json({ error: 'Valid postId required' });
        }
        const media = req.file;
        //check for media and trim
        const mediaUrl = media ? `/uploads/${media.filename}` : null;
        //check for text content
        if (!content || content.trim() === '') {
            console.warn('Failed to create comment, No content provided.')
            return res.status(400).json({ error: 'Content Required' });
        }
        const trimmedContent = content.trim();
        const trimmedMediaUrl = typeof mediaUrl === 'string' ? mediaUrl.trim() : null;

        //saves to DB with authorId
        const newComment = await prisma.comment.create({
            data: {
                content: trimmedContent,
                mediaUrl: trimmedMediaUrl,
                authorId: req.userId,
                postId: Number(postId),
            },
            include: {
                author: {
                    select: {
                        username: true,
                    }
                }
            }
        });
        //returns post object
        console.log(`Comment created by user ${req.userId} on post ${postId}`);
        return res.status(201).json(newComment);
    } catch (error) {
        console.error('Could not create comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//grabbing the comments 
async function getCommentsByPostId(req, res) {
    const { postId } = req.params;

    if (!postId || isNaN(Number(postId))) {
        return res.status(400).json({ error: 'Valid postId required' });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { postId: Number(postId) },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        });
        res.json(comments);

    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
}

async function getCommentCount(req, res) {
    const { postId } = req.query;

    if (!postId || isNaN(Number(postId))) {
        return res.status(400).json({ error: 'Valid postId required' });
    }

    try {
        const commentsCount = await prisma.comment.count({
            where: {
                postId: Number(postId)
            }
        });

        res.json(commentsCount);

    } catch (error) {
        console.error('Error fetching comment count', error);
        res.status(500).json({ error: 'Failed to fetch comment count' });
    }
}


module.exports = { createComment, getCommentsByPostId, getCommentCount };