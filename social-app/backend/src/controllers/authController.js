const bcrypt = require('bcrypt'); //import bcrypt
const prisma = require('../utils/prisma');
const jwt = require('jsonwebtoken');

//register

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

//login controller

const login = async (req, res) => {
    console.log("Login route hit!");
    try {
        // 1 extract email and password 
        const { email, password } = req.body;
        //validate and return error 400 if any missing
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required' });
        }
        // 2 look up user by email

        const foundUser = await prisma.user.findUnique({ where: { email } });

        if (!foundUser) {
            return res.status(401).json({ error: 'User not found' })
        }
        // 3 compare password
        const matchPassword = await bcrypt.compare(password, foundUser.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Password Incorrect' })
        }
        // 4 if valid sign JWT
        console.log('JWT signing')
        const token = jwt.sign(
            { id: foundUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        // 5 respond with token
        return res.status(200).json({
            token,
            user: {
                id: foundUser.id,
                email: foundUser.email,
                username: foundUser.username
            }
        });

    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

//exporting the register func
module.exports = {
    register,
    login,
};