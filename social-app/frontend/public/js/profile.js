// import 
//import { checkAuth } from "/protected/js/checkAuth.js";
import { createPostCard } from "/modules/createPostCard.js";
import { loadFeed } from "/modules/loadFeed.js";

const feedContainer = document.getElementById('feedContainer');
const emptyFeedMsg = document.getElementById('emptyFeedMsg');
const followFailMsg = document.getElementById('followFailMsg');
const createPostForm = document.getElementById('createPostForm');
const errorMsg = document.getElementById('errorMsg');
document.getElementById('errorMsg').hidden = true;

//call modules
// checkAuth();

// get user from query
const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');

//fetch on page load
document.addEventListener('DOMContentLoaded', () => {


    if (!userId) {
        errorMsg.hidden = false;
        document.getElementById('errorMsg').innerText = 'Invalid user ID. Redirecting...';
        return setTimeout(() => window.location.href = "/protected/pages/feed.html", 2000);
    }
    getUserProfile(userId);
    loadFeed(userId);
});

async function getUserProfile(userId) {
    try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error('User not found');

        const user = await res.json();
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `
            <h2> ${user.username} </h2>
            <p> Followers: ${user.followers} </p>
            <p>Following: ${user.following} </p>
        `;

    } catch (error) {
        errorMsg.hidden = false;
        document.getElementById('errorMsg').innerText = 'Unable to Load User Profile.'
        console.log('Unable to load user profile')
    }
};