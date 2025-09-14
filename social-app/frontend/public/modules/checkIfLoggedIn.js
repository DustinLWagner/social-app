const sidebar = document.getElementById('sidebar');
const followBtn = document.getElementById('followBtn');
const loginBtn = document.getElementById('loginBtn');
const homeBtn = document.getElementById('homeBtn');
const loginSection = document.getElementById('loginSection');
const reg_link = document.getElementById('reg_link');
const openPostModal = document.getElementById('openPostModal');

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
            if (openPostModal) openPostModal.hidden = true;
            if (sidebar) sidebar.style.setProperty('display', 'flex');//display sidebar if not logged in
            document.body.style.display = 'flex'; //display page contents last to prevent flash
            return null;
        }

        const response = await fetch('http://localhost:3000/api/auth/profile', {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + authToken }
        });

        if (response.status === 403) { //user not logged in, shows sidebar and login, hides follow and home buttons
            if (loginBtn) loginBtn.hidden = false;
            if (followBtn) followBtn.hidden = true;
            if (homeBtn) homeBtn.hidden = true;
            if (openPostModal) openPostModal.hidden = true;
            if (sidebar) sidebar.style.setProperty('display', 'flex');//display sidebar
            document.body.style.display = 'flex'; //display page contents last to prevent flash
            return null;
        } else if (!response.ok) {
            //unexpected servor error
            console.warn('Unexpected response:', response.status);
            document.body.style.display = 'flex';
            return null;
        }
        const user = await response.json();
        //valid, user stays put, shows home and follow button
        if (homeBtn) homeBtn.hidden = false;
        if (followBtn) followBtn.hidden = false;
        if (loginSection) loginSection.hidden = true;
        if (reg_link) reg_link.hidden = true;
        if (sidebar) sidebar.style.setProperty('display', 'flex');//display sidebar if not logged in
        document.body.style.display = 'flex';//display page contents last to prevent flash
        return user;

    } catch (error) {
        console.error("Session check failed:", error);
        document.body.style.display = 'flex';
    }
}

export { checkIfLoggedIn };