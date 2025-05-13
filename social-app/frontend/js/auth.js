console.log('script loaded')

//grab login form
document.getElementById('loginForm').addEventListener('submit',
    function login(event) {
        //prevent page reloading after submit event
        event.preventDefault();
        //grab email and password values for fetch 
        const userSubmitEmail = document.querySelector('input[name=email]').value;
        const userSubmitPassword = document.querySelector('input[name=password]').value;

        //fetch call
        const url = 'http://localhost:3000/api/auth/login'
        const creds = { email: userSubmitEmail, password: userSubmitPassword }
        const jsonCreds = JSON.stringify(creds);

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonCreds
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bad Fetch Response');
                }
                return response.json()
            })
            .then(data => {
                // have parsed data here
                if (!data.token) {
                    throw new Error('No Token Found')
                }
                localStorage.setItem('authToken', data.token);
                setTimeout(() => {
                    window.location.href = 'feed.html';
                }, 1000);

            })
            .catch(error => {
                //fetch or logic error here
                document.getElementById('loginError').hidden = false;
                document.getElementById('loginError').textContent = error.message;
            })
    });

