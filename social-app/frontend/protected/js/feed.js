// import 
import { postModal } from "/modules/postModal.js";
import { checkAuth } from "./checkAuth.js";
import { logoutUser } from "/js/logout.js";
import { createPostCard } from "/modules/createPostCard.js";
import { loadFeed } from "/modules/loadFeed.js";
import { commentsModal } from "/modules/commentsModal.js";

const feedContainer = document.getElementById('feedContainer');
const emptyFeedMsg = document.getElementById('emptyFeedMsg');
const feedFailMsg = document.getElementById('feedFailMsg');
const postFailMsg = document.getElementById('postFailMsg');
const pubFeedBtn = document.getElementById('pubFeedBtn').addEventListener(
    'click', () => window.location.href = "/pages/publicFeed.html");


//authentication check
checkAuth();
//fetch on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
    postModal();
    commentsModal();
});

//welcome message saying Hello ${USER}
const user = await checkAuth();
document.getElementById('welcomeMsg').innerHTML = `Hello ${user.username}`

//show pages contents after page load to prevent flash
setTimeout(() => {
    document.body.style.display = 'flex';
}, 100);