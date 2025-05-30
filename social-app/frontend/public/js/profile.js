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
const statusMsg = document.getElementById('statusMsg');
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
    const loggedInUserId = (await checkIfLoggedIn())?.id.toString() || null;

    if (!loggedInUserId) {
        errorMsg.hidden = false;
        errorMsg.innerText = 'Not logged in.'
        return;
    }
    //hide follow button on own profile
    if (viewedUserId === loggedInUserId) {
        followBtn.hidden = true;
        return;
    };

    //check if already following
    let isFollowing = await followStatus(loggedInUserId, viewedUserId);
    //set follow button text per followStatus
    followBtn.innerText = isFollowing ? 'Unfollow' : 'Follow';
    followBtn.hidden = false;

    //Follow button click behavior
    followBtn.onclick = async () => {

        let isFollowing = followBtn.innerText === 'Unfollow';
        const origText = isFollowing ? 'Unfollow' : 'Follow';
        const loadingText = isFollowing ? 'Unfollowing...' : 'Following...';
        //disable button and show loading status
        followBtn.disabled = true;
        //show loadingText after 500ms
        let loadTimeout = setTimeout(() => {
            followBtn.innerText = loadingText;
        }, 500);

        const actionUrl = isFollowing ? `/api/users/${viewedUserId}/unfollow` : `/api/users/${viewedUserId}/follow`;
        // POST API call w/ followModule
        const success = await followModule(viewedUserId, actionUrl);
        //clear timeout
        clearTimeout(loadTimeout);

        if (success) {
            //on success Flip true / false
            isFollowing = !isFollowing;
            //update button accordingly
            followBtn.innerText = isFollowing ? 'Unfollow' : 'Follow';

            //display Success in statusMsg
            statusMsg.innerText = isFollowing ? `You are now following` : 'You have unfollowed'
        } else {
            //on failure reset button to previous state
            followBtn.innerText = isFollowing ? 'Unfollow' : 'Follow';
            statusMsg.innerText = 'Sorry! Something went wrong. Please try again!'
        }
        followBtn.disabled = false;
        setTimeout(() => {
            statusMsg.innerText = '';

        }, 3000);
    };

    console.log('Initial button text set to:', followBtn.innerText);
    if (!viewedUserId) {
        errorMsg.hidden = false;
        document.getElementById('errorMsg').innerText = 'Invalid user ID. Redirecting...';
        return setTimeout(() => window.location.href = "/protected/pages/feed.html", 2000);
    }
});
