// import 
import { checkAuth } from "./checkAuth.js";
import { logoutUser } from "/js/logout.js";

const feedContainer = document.getElementById('feedContainer');
const emptyFeedMsg = document.getElementById('emptyFeedMsg');
const feedFailMsg = document.getElementById('feedFailMsg');
const postFailMsg = document.getElementById('postFailMsg');
const createPostForm = document.getElementById('createPostForm');
const postContentInput = document.getElementById('postContent');
const postMediaInput = document.getElementById('postMedia');

//call modules
checkAuth();
//fetch on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});
//create post form//
createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handlePostSubmit();
});

// hide post fail message on input/focus
const hidePostFailMsg = () => postFailMsg.hidden = true;

postContentInput.addEventListener('input', hidePostFailMsg);
postContentInput.addEventListener('focus', hidePostFailMsg);

postMediaInput.addEventListener('change', hidePostFailMsg);
postMediaInput.addEventListener('focus', hidePostFailMsg);

//feed loader//
//GET posts from /api/posts/feed
async function loadFeed() {
    emptyFeedMsg.hidden = true;
    feedFailMsg.hidden = true;
    //clear feed container before loading posts
    feedContainer.innerHTML = '';
    try {
        const response = await fetch('/api/posts/feed', {
            method: 'GET',
        });
        const posts = await response.json();

        if (!posts.length) {

            emptyFeedMsg.hidden = false;
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
        feedFailMsg.hidden = false;
    }
}


/// load feed helper loop function///

//helper function loops through array, renders each post into DOM
function createPostCard(post) {
    //create div
    let divCard = document.createElement('div');
    divCard.className = 'postCard';

    //create username h3
    let username = document.createElement('h3');
    username.className = 'postcardUsername';
    username.innerText = post.author.username;
    divCard.append(username);

    //create add post content
    let content = document.createElement('p');
    content.className = 'cardContent';
    content.innerText = post.content;
    divCard.append(content);

    //check if post.mediaUrl exists and is not empty
    if (post.mediaUrl && post.mediaUrl.trim()) {
        //if yes create img element, set src to mediaUrl, give class postMedia
        let postMedia = document.createElement('img');
        postMedia.className = 'postMedia';
        postMedia.src = post.mediaUrl;
        divCard.append(postMedia);
    }

    //create formatted timestamp
    let cardTime = document.createElement('sub')
    cardTime.className = 'cardTimestamp';
    //get createdAT
    let createdAt = post.createdAt;
    //convert from string to Date object
    let date = new Date(createdAt);
    //format date into a readable string
    let cardPostDate = date.toDateString();
    cardTime.innerText = cardPostDate;
    divCard.append(cardTime);
    //return back inside loadfeed() append this result to feedContainer
    return divCard;

}

//handlePostSubmit function//

async function handlePostSubmit() {
    postFailMsg.hidden = true;
    //get values from post content
    const content = postContentInput.value.trim();
    if (!content) {
        postFailMsg.innerText = 'Post cannot be empty.';
        postFailMsg.hidden = false;
        return;
    }

    const media = postMediaInput.files[0];


    // build formData object
    const postFormData = new FormData();
    postFormData.append('content', content);
    if (media) {
        postFormData.append('media', media);
    }

    createPostForm.querySelector('button').disabled = true; //disable post it button during upload, prevent spamming 
    try {
        //send POST request to /api/posts/create with form data
        const response = await fetch('/api/posts/create', {
            //use authorization header to include JWT from localStorage
            method: 'POST',
            credentials: 'include',
            body: postFormData,
        });
        //on success call createPostCard(newPost) and prepend it to feed
        if (response.ok) {
            const newPost = await response.json();
            const card = createPostCard(newPost);
            feedContainer.prepend(card);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            createPostForm.reset();
        } else {
            //on fail unhide <p id="postFailMsg">
            postFailMsg.innerText = 'Failed to create post.';
            postFailMsg.hidden = false;
        }

        createPostForm.querySelector('button').disabled = false;

    } catch (error) {
        postFailMsg.innerText = 'Network Error';
        postFailMsg.hidden = false;
        console.error('Error submitting post:', error)
        createPostForm.querySelector('button').disabled = false;
    }
};