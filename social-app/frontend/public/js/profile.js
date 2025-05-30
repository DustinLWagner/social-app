// import 
import { createPostCard } from "/modules/createPostCard.js";
import { loadFeed } from "/modules/loadFeed.js";
import { checkIfLoggedIn } from "../modules/checkIfLoggedIn.js";
import { followModule } from "../modules/followModule.js";
import { getUserProfile } from "../modules/getUserProfile.js";
import { followStatus } from "../modules/getUserProfile.js";

const feedContainer = document.getElementById('feedContainer');
const emptyFeedMsg = document.getElementById('emptyFeedMsg');
const createPostForm = document.getElementById('createPostForm');
const errorMsg = document.getElementById('errorMsg');
//nav buttons
const pubFeedBtn = document.getElementById('pubFeedBtn');
const loginBtn = document.getElementById('loginBtn');
const homeBtn = document.getElementById('homeBtn');
const followBtn = document.getElementById('followBtn');

document.getElementById('errorMsg').hidden = true;

//nav buttons
Object.assign(pubFeedBtn, {
    hidden: false,
    onclick: () => window.location.href = "publicFeed.html"
});
Object.assign(loginBtn, {
    hidden: true,
    onclick: () => window.location.href = "index.html"
});
Object.assign(homeBtn, {
    hidden: true,
    onclick: () => window.location.href = "../../protected/feed.html"
});

//fetch on page load
document.addEventListener('DOMContentLoaded', async () => {
    // get viewedUser from query
    const viewedUserId = new URLSearchParams(window.location.search).get('userId');
    await getUserProfile(viewedUserId);
    await loadFeed(viewedUserId);

    //get logged in userId
    const loggedInUser = await checkIfLoggedIn();
    if (!loggedInUser) {
        errorMsg.hidden = false;
        errorMsg.innerText = 'Not logged in.'
        return;
    }
    //hide follow button on own profile
    if (viewedUserId === loggedInUser.userId.toString()) {
        followBtn.hidden = true;
        return;
    };


    //check if already following
    let isFollowing = await followStatus(loggedInUser.id, viewedUserId);
    //set follow button text per followStatus
    followBtn.innerText = isFollowing ? 'Follow' : 'Unfollow';
    followBtn.hidden = false;

    //set the button click behavior
    followBtn.onclick = async () => {
        const actionUrl = isFollowing ? `/api/users/${viewedUserId}/follow` : `/api/users/${viewedUserId}/unfollow`;
        // POST API call w/ followModule
        const success = await followModule(viewedUserId, actionUrl);
        if (success) {
            //on success Flip true / false
            isFollowing = !isFollowing;
            //update button accordingly
            followBtn.innerText = isFollowing ? 'Follow' : 'Unfollow';
        }
    };

    console.log('Initial button text set to:', followBtn.innerText);
    if (!viewedUserId) {
        errorMsg.hidden = false;
        document.getElementById('errorMsg').innerText = 'Invalid user ID. Redirecting...';
        return setTimeout(() => window.location.href = "/protected/pages/feed.html", 2000);
    }
});
