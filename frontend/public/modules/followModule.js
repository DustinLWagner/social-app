async function followModule(viewedUserId, actionUrl) {
    let errorMsg = document.getElementById('errorMsg');
    try {

        //fetch() POST to URL
        const response = await fetch(actionUrl, {
            method: 'POST',
        })
        //if already followed
        if (response.status === 400 || response.status === 433) {//you cant follow yourself 433 custom code 
            const err = await response.json();
            console.log(err.error);
            errorMsg.hidden = false;
            errorMsg.innerText = err.error;
            return false;
        }

        //alert success
        console.log(actionUrl + ' successful.')
        return true;

    } catch (error) {
        errorMsg.hidden = false;
        errorMsg.innerText = 'Something went wrong Try Again.'
        return false;
    }

}
export { followModule };