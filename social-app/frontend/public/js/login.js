const FEED_PAGE = '../protected/feed.html';

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
                const token = data.token?.trim();
                document.cookie = `token=${token}; path=/; max-age=86400`; // 1 day
                // have parsed data here
                if (!token) {
                    throw new Error('No Token Found')
                }
                localStorage.setItem('authToken', token);
                console.log("Redirecting to feed.html...");
                window.location.href = FEED_PAGE;

                return;

            })
            .catch(error => {
                //fetch or logic error here
                document.getElementById('loginError').hidden = false;
                document.getElementById('loginError').textContent = error.message;
            })
    });