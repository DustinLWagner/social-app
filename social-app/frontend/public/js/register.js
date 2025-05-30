document.getElementById('registerForm').addEventListener('submit', function register(event) {

    //prevent page reloading after submit event
    event.preventDefault();
    //grab username email and password values 
    const userSubmitUsername = document.querySelector('input[name=username]').value;
    const userSubmitEmail = document.querySelector('input[name=email]').value;
    const userSubmitPassword = document.querySelector('input[name=password]').value;

    //fetch call
    const url = 'http://localhost:3000/api/auth/register'
    const creds = { username: userSubmitUsername, email: userSubmitEmail, password: userSubmitPassword }
    const jsonCreds = JSON.stringify(creds);

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonCreds
    })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Registration Failed');
            }
            return data;
        })
        .then(data => {
            // have parsed data here
            if (!data.message) {
                throw new Error('No confirmation from server')
            }
            setTimeout(() => {
                window.location.href = '/pages/index.html';
            }, 1000);
        })
        .catch(error => {
            //fetch or logic error here
            const errorBox = document.getElementById('registerError');
            errorBox.hidden = false;
            errorBox.textContent = error.message;
        })


});