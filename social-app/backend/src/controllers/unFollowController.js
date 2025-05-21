async function unFollowController(req, res) {
    //checks for JWT
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const userToUnfollow = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!userToUnfollow) {
            return res.status(404).json({ error: 'User does not exist!' })
        };
        const existingFollow = await prisma.follower.findUnique({
            where: {
                followerId_followeeId: {
                    followerId: req.userId,
                    followeeId: parseInt(req.params.id)
                }
            }
        });
        if (!existingFollow) {
            return res.status(400).json({ error: 'You do not follow this user' });
        }
        await prisma.follower.delete({
            where: {
                followerId_followeeId: {
                    followerId: req.userId,
                    followeeId: parseInt(req.params.id)
                }
            }

        });
        return res.status(200).json({ message: 'Unfollowed Successfully' });



    } catch (error) {
        console.error('Follow error:', error);
        res.status(500).json({ error: 'Internal server error' });
    };
}
module.exports = unFollowController;