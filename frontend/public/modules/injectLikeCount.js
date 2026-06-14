async function injectLikeCount(postId, likesCount) {

    // GET request for number of likes
    try {

        const likes = `/api/likes/count?targetId=${postId}` ///call for count of likes on post
        const response = await fetch(likes, {
            method: 'GET',
        });
        const count = await response.json();

        if (!count || count.count === 0) {
            //no length displays nothing
            return;
        }

        likesCount.innerText = count.count;

    } catch (error) {
        // errors 404, 500, etc
        console.error('Error fetching a count of likes', error);
    }

}

export { injectLikeCount }