import { loadFeed } from "/modules/loadFeed.js";
import { checkIfLoggedIn } from "../modules/checkIfLoggedIn.js";

//fetch on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
    checkIfLoggedIn();

});

