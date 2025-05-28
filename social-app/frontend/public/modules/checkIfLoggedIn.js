const sidebar = document.getElementById('sidebar');
const followBtn = document.getElementById('followBtn');
const loginBtn = document.getElementById('loginBtn');
const homeBtn = document.getElementById('homeBtn');

//asyn function for checking if logged in on public pages *Does Not Redirect*
async function checkIfLoggedIn() {

    //get token
    const authToken = localStorage.getItem('authToken');
    //check for token, no token redirect
    if (!authToken) {
        if (loginBtn) {
            loginBtn.hidden = false;
        };
        if (followBtn) {
            followBtn.hidden = true;
        };

        if (sidebar) {//hide sidebar if logged in
            sidebar.style.display = 'flex'; //overrides display: flex
        }
        document.body.style.display = 'flex';
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/api/auth/profile', {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + authToken }
        })
        if (!response.ok) { //invalid, shows login button
            loginBtn.hidden = false;
        }
        //valid, user stays put, shows home button
        if (homeBtn) {
            homeBtn.hidden = false
        }
        if (followBtn) {
            followBtn.hidden = false
        }
        document.body.style.display = 'flex';
    } catch (error) {
        console.error("Session check failed:", error);
    }
}

export { checkIfLoggedIn };