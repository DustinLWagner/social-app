const prisma = require('../utils/prisma');

async function createPost(req, res) {
    //checks for JWT
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    //pulls content and optional mediaUrl and trims
    try {
        const { content, mediaUrl } = req.body;
        if (!content || content.trim() === '') {
            console.warn('Failed to create post, No content provided.')
            return res.status(400).json({ error: 'Content Required' });
        }
        const trimmedContent = content.trim();
        const trimmedMediaUrl = mediaUrl?.trim() || null;
        //saves to DB with authorId
        const newPost = await prisma.post.create({
            data: {
                content: trimmedContent,
                mediaUrl: trimmedMediaUrl,
                authorId: req.userId
            }
        });
        //returns post object
        return res.status(201).json(newPost);
    } catch (error) {
        console.error('Could not create post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createPost };