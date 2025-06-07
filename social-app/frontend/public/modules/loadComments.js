async function loadComments(postId) {
    try {
        //GET comments from /api/comments/:postId 
        const commentsUrl = `/api/comments/${postId}`
        const response = await fetch(commentsUrl, {
            method: 'GET',
        });
        const comments = await response.json();
        return comments;

    } catch (error) {
        console.error('Failed to load comments:', error);
        return [];
    }
};

export { loadComments }