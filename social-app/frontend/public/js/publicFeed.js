import { loadFeed } from "/modules/loadFeed.js";
import { checkIfLoggedIn } from "../modules/checkIfLoggedIn.js";


//fetch on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
    checkIfLoggedIn();
    const homeBtn = document.getElementById('homeBtn').addEventListener(
        'click', () => window.location.href = "/protected/feed.html");
});