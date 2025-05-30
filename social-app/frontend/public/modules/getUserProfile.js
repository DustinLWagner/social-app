async function getUserProfile(viewedUserId) {
    try {
        const res = await fetch(`/api/users/${viewedUserId}`);
        if (!res.ok) throw new Error('User not found');
        //return the usable data 
        const user = await res.json();
        //build profile information div with response data
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `
            <h2> ${user.username} </h2>
            <p> Followers: ${user.followers} </p>
            <p>Following: ${user.following} </p>
        `;

    } catch (error) {
        errorMsg.hidden = false;
        document.getElementById('errorMsg').innerText = 'Unable to Load User Profile.'
        console.log('Unable to load user profile')
    }
};

async function followStatus(loggedInUserId, viewedUserId) {

    try {//get followers from API
        const res = await fetch(`/api/users/${viewedUserId}/followers`);
        if (!res.ok) return false;

        const followers = await res.json();//make data usable
        //check all followers for loggedInUser's ID, checking if already following
        return followers.some(user => user.id === loggedInUserId);

    } catch (error) {
        console.error('Failed to check follow status', error);
        return false;
    }

}

export { getUserProfile, followStatus };