const bcrypt = require('bcrypt');


const register = async (req, res) => {
    //Grab username, email, and password from the request body.
    //Inside the function we access the inputted fields, aka info, and separate it into individually labeled and usable data.
    const { username, email, password } = req.body; //req.body → the JSON body they sent
    //check if any field is falsy
    if (!username || !email || !password) {
        //any or all fields missing return error bad request 
        return res.status(400).json({ error: 'All fields are required' });
    };

    console.log('Register route was hit');

    //hash the password, await bcrypt inside async
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    //respond with OK message id endpoint is hit
    return res.status(200).json({ message: 'Register Endpoint Hit' });
};

//exporting the register func
module.exports = {
    register,
};



/* 
req.body → the JSON body they sent 
 "username": "janedoe",
  "email": "jane@example.com",
  "password": "securepassword"
*/