const LOGIN_PAGE = '/pages/index.html';

function logoutUser() {
    const logoutMessage = document.getElementById('statusMsg');
    //display logoutMessage
    if (logoutMessage) {
        logoutMessage.textContent = 'Logging out...';
        //remove JWT
        localStorage.removeItem('authToken');
        document.cookie = `token=; path=/; max-age=0`
        //pause for 1.5 seconds before redirect
        setTimeout(() => {
            window.location.href = LOGIN_PAGE;
        }, 1500);
    }
};
// attach listener if button exists
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutButton');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
})
export { logoutUser }