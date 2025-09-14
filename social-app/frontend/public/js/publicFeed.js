import { loadFeed } from "/modules/loadFeed.js";
import { checkIfLoggedIn } from "../modules/checkIfLoggedIn.js";
import { postModal } from "../modules/postModal.js"

const emptyFeedMsg = document.getElementById('emptyFeedMsg');
const feedFailMsg = document.getElementById('feedFailMsg');
const postFailMsg = document.getElementById('postFailMsg');

//fetch on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
    checkIfLoggedIn();
    postModal();
    const homeBtn = document.getElementById('homeBtn').addEventListener(
        'click', () => window.location.href = "/protected/feed.html");
});