//implement Pagination later
async function listFollowers(req, res) {
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


        //query list of users that follow User
        const followerList = await prisma.follower.findMany({
            where: { followeeId: userId },
            include: {
                follower: {
                    select: { id: true, username: true }
                }
            }
        });
        //no followers return empty array
        if (!followerList.length) {
            return res.status(200).json([]);
        };
        //return list of followers
        return res.status(200).json(followerList.map(f => f.follower));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = listFollowers;