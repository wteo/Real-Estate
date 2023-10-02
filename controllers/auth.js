import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import Users from '../models/users.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getRegisterForm = (req, res) => {
    return res.render(path.join(__dirname, '..', 'views', 'auth', 'register.ejs'), 
        { 
            errorMessage: req.flash('error')[0],
            oldInput: req.session.oldInput || {}
        });
}

const postRegisterForm = async (req, res, next) => {
    try {

        const user = await Users.findOne({ username: req.body.username });
        const { username, password, confirmedPassword } = req.body;

        if (username.length < 5) {
            req.flash('error', 'Please choose a longer username.');
            return res.redirect('/register');
        }

        if (!user) {

            // password conditions
            const passwordMinimumLength = password.length < 8 
            const passwordCriteria = !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)

            if (passwordMinimumLength || passwordCriteria) {
                req.flash('error', 'Your password must be at least 8 characters long and contains at least 1 alphabet and 1 number.');
                req.session.oldInput = { username };
                return req.session.save(error => error ? next(error) : res.redirect('/register'));
            }
            if (password !== confirmedPassword) {
                console.log('Passwords do not match.');
                req.flash('error', 'Passwords do not match.');
                req.session.oldInput = { username };
                return req.session.save(error => error ? next(error) : res.redirect('/register'));
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await Users.create({ username, password: hashedPassword });
            console.log('New User created!');
            req.flash('success', 'New User created!');
            return req.session.destroy(error => error ? next(error) : res.redirect('/login'));
        } else {
            console.log('This username is already registered. Please login.');
            req.flash('error', 'This username is already registered. Please login.');
            req.session.oldInput = { username };
            return req.session.save(error => error ? next(error) : res.redirect('/register'));
        }

    } catch(error) {
        next(error);
    }
}

const getLoginForm = (req, res) => {
    return res.render(path.join(__dirname, '..', 'views', 'auth', 'login.ejs'), 
        { 
            successMessage: req.flash('success')[0], 
            errorMessage: req.flash('error')[0],
            oldInput: req.session.oldInput || {}
        });
}


const postLoginForm = async (req, res, next) => {
    
    try {
        const user = await Users.findOne({ username: req.body.username });
        console.log(user);

        if (user === null) {
            console.log('No username exists. Please register a new account.');
            req.flash('error', 'No username exists. Please register a new account.');
            return res.redirect('/login');
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if (isPasswordCorrect) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(error => error ? next(error) : res.redirect(`/admin`));
        } else {
            console.log('Invalid password!');
            req.flash('error', 'Invalid password!');
            req.session.oldInput = { username: req.body.username };
            return req.session.save(error => error ? next(error) : res.redirect('/login'));
        }   

    } catch (error) {
        next(error);
    }
}

const postLogout = (req, res, next) => {
    console.log('You are now logged out!');
    return req.session.destroy(error => error ? next(error) : res.redirect('/'));
}

const usersController = { getRegisterForm, postRegisterForm, getLoginForm, postLoginForm, postLogout };

export default usersController;