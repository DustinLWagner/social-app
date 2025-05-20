import { loadFeed } from "/modules/loadFeed.js";
//fetch on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});