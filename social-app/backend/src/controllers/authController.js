const bcrypt = require('bcrypt'); //import bcrypt
const prisma = require('../utils/prisma');

const register = async (req, res) => {
    //Grab username, email, and password from the request body.
    //Inside the function we access the inputted fields, aka info, and separate it into individually labeled and usable data.
    const { username, email, password } = req.body; //req.body → the JSON body they sent
    //check if any field is falsy
    if (!username || !email || !password) {
        //any or all fields missing return error bad request 
        return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('Register route was hit');

    //hash the password, await bcrypt inside async
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    try {
        const newUser = await prisma.user.create({ //on success create user with supplied fields
            data: {
                username,
                email,
                password: hashedPassword
            },
        });

        return res.status(201).json({ // alert success
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
        });


    } catch (error) {
        console.error('Error creating User', error);
        //handle unique contraint violation
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Username or Email already exists!' });
        }
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

//exporting the register func
module.exports = {
    register,
};