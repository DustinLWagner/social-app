const LOGIN_PAGE = '/pages/index.html';
const FEED_PAGE = '/protected/feed.html';

//async Auth Session Check (Centralized Utility)
async function checkAuth() {
    //show checking session message
    const sessionChecker = document.getElementById('sessionCheck');
    if (sessionChecker) {
        sessionChecker.textContent = 'Checking session...';
    };
    //get token
    const authToken = localStorage.getItem('authToken');
    //check for token, no token redirect
    if (!authToken) {
        window.location.href = LOGIN_PAGE;
        return null;
    }
    try {
        const response = await fetch('http://localhost:3000/api/auth/profile', {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + authToken }
        })
        if (!response.ok) { //invalid, returns to index
            window.location.href = LOGIN_PAGE;
            return null;
        }
        const user = await response.json();

        //valid, user stays, 
        if (!window.location.href.includes(FEED_PAGE)) //redirects if not already on feed
        { window.location.href = FEED_PAGE; }

        if (sessionChecker) {
            sessionChecker.textContent = '';
        }
        return user;

    } catch (error) {
        console.error("Session check failed:", error);
        window.location.href = LOGIN_PAGE; // fallback if fetch fails entirely
        return null;
    }
}

export { checkAuth };