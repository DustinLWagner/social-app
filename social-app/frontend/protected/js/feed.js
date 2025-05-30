// import 
import { checkAuth } from "./checkAuth.js";
import { logoutUser } from "/js/logout.js";
import { createPostCard } from "/modules/createPostCard.js";
import { handlePostSubmit } from "/modules/handlePostSubmit.js";
import { loadFeed } from "/modules/loadFeed.js";

const feedContainer = document.getElementById('feedContainer');
const emptyFeedMsg = document.getElementById('emptyFeedMsg');
const feedFailMsg = document.getElementById('feedFailMsg');
const postFailMsg = document.getElementById('postFailMsg');
const createPostForm = document.getElementById('createPostForm');
const postContentInput = document.getElementById('postContent');
const postMediaInput = document.getElementById('postMedia');
const pubFeedBtn = document.getElementById('pubFeedBtn').addEventListener(
    'click', () => window.location.href = "/pages/publicFeed.html")

//authentication check
checkAuth();
//fetch on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});


//welcome message saying Hello ${USER}


document.getElementById('welcomeMsg').innerHTML = 'Hello User'


//create post form//
createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handlePostSubmit(createPostForm, postContentInput, postMediaInput, postFailMsg, feedContainer);
});

// hide post fail message on input/focus
const hidePostFailMsg = () => postFailMsg.hidden = true;

postContentInput.addEventListener('input', hidePostFailMsg);
postContentInput.addEventListener('focus', hidePostFailMsg);

postMediaInput.addEventListener('change', hidePostFailMsg);
postMediaInput.addEventListener('focus', hidePostFailMsg);

//show pages contents after page load to prevent flash
setTimeout(() => {
    document.body.style.display = 'flex';
}, 100);