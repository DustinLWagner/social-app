const sidebar = document.getElementById('sidebar');
const followBtn = document.getElementById('followBtn');
const loginBtn = document.getElementById('loginBtn');
const homeBtn = document.getElementById('homeBtn');

//asyn function for checking if logged in on public pages *Does Not Redirect*
async function checkIfLoggedIn() {
    try {
        //get token
        const authToken = localStorage.getItem('authToken');
        //check for token
        if (!authToken) {
            if (loginBtn) loginBtn.hidden = false;
            if (followBtn) followBtn.hidden = true;
            if (homeBtn) homeBtn.hidden = true;
            if (sidebar) sidebar.style.setProperty('display', 'flex');//display sidebar if not logged in
            document.body.style.display = 'flex'; //display page contents last to prevent flash
            return null;
        }

        const response = await fetch('http://localhost:3000/api/auth/profile', {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + authToken }
        });

        if (!response.ok) { //invalid, shows login button
            if (loginBtn) loginBtn.hidden = false;
            return null;
        }
        const user = await response.json();
        //valid, user stays put, shows home and follow button

        if (homeBtn) homeBtn.hidden = false
        if (followBtn) followBtn.hidden = false
        document.body.style.display = 'flex'; //display page contents last to prevent flash
        return user;
    } catch (error) {
        console.error("Session check failed:", error);
    }
}

export { checkIfLoggedIn };