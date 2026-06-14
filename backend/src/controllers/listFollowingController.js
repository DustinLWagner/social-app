//implement Pagination later
async function listFollowing(req, res) {
    try {
        // Extract :id from params
        const userId = parseInt(req.params.id);
        //check if userId is number
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid User ID' })
        };
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        //Check for userExists
        if (!user) {
            return res.status(404).json({ error: 'User does not exist!' })
        };

        //query list that User follows
        const followingList = await prisma.follower.findMany({
            where: { followerId: userId },
            include: {
                followee: {
                    select: { id: true, username: true }
                }
            }
        });
        //no followers return empty array
        if (!followingList.length) {
            return res.status(200).json([]);
        };
        //return list of followers
        return res.status(200).json(followingList.map(f => f.followee));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = listFollowing;