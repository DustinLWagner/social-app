import { createPostCard } from "/modules/createPostCard.js";

async function loadFeed(userId = null) {
    const feedContainer = document.getElementById('feedContainer');
    const emptyFeedMsg = document.getElementById('emptyFeedMsg');
    const feedFailMsg = document.getElementById('feedFailMsg');
    emptyFeedMsg.hidden = true;
    feedFailMsg.hidden = true;
    feedContainer.innerHTML = '';

    try {
        //GET posts from /api/posts/feed
        const postsUrl = userId ? `/api/posts/users/${userId}/posts` : '/api/posts/feed'
        const response = await fetch(postsUrl, {
            method: 'GET',
        });
        const posts = await response.json();
        //no message length gives emptyFeedMsg error
        if (!posts.length) {
            document.getElementById('emptyFeedMsg').hidden = false;
            return;
        }
        //Loop through posts
        for (const post of posts) {
            //Create the card 
            let card = createPostCard(post);
            //append postCard from createPostCard
            feedContainer.append(card);
        };

    } catch (error) {
        document.getElementById('feedFailMsg').hidden = false;
    }
}
export { loadFeed }