async function followController(req, res) {
    //checks for JWT
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        if (req.userId === parseInt(req.params.id)) {
            return res.status(400).json({ error: "You can't follow yourself!" })
        }
        const userToFollow = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!userToFollow) {
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
        if (existingFollow) {
            return res.status(400).json({ error: 'You already follow this user' });
        }
        await prisma.follower.create({
            data: {
                followerId: req.userId,
                followeeId: parseInt(req.params.id)
            }
        });
        return res.status(200).json({ message: 'Followed Successfully' });



    } catch (error) {
        console.error('Follow error:', error);
        res.status(500).json({ error: 'Internal server error' });
    };
}
module.exports = followController;