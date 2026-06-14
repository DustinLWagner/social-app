async function injectCommentCount(postId, comCount) {

    // GET request for number of comments
    try {

        const comments = `/api/comments/count?postId=${postId}`
        const response = await fetch(comments, {
            method: 'GET',
        });
        const count = await response.json();

        if (!count) {
            //no length displays nothing
            return;
        }

        comCount.innerText = count;

    } catch (error) {
        // errors 404, 500, etc
        console.error('Error fetching comment counts', error);
    }

}

export { injectCommentCount }