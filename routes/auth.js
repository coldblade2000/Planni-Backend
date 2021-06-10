import {JWT_SECRET} from "../secrets";
import {SUCCESS_REDIRECT_URL} from "../constants";

var express = require('express');
var router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')


/* GET home page. */
router.get('/google', [async (req, res, next) => {
    req.session.desiredusername = req.query.username;
    next()
}, passport.authenticate('google', {
    scope: ['profile', 'email']
})]);

router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/back/auth/login?status=error',
        session: false
    }),
    (req, res) => {
        console.log('Successful login: ', req.user)
        const tokenizedObject = {
            _id: req.user._id,
            email: req.user.email
        }
        const token = jwt.sign(tokenizedObject, JWT_SECRET);
        console.log(`AUTH: Redirecting with token: ${token}`)
        res.redirect(`${SUCCESS_REDIRECT_URL}?token=${token}`)
    }
);


router.get('/logout', (req, res) => {
    res.status(202).send(req.user);
    req.logout();
    req.session = null;
});

router.get('/login', (req, res) => {
    const status = req.query.status || null
    //console.log("/auth/  user: ", req.user)
    res.render('login', {title: 'Login/Register', user: req.user, status})
});

router.get('/signup', (req, res) => {
    //console.log("/auth/  user: ", req.user)
    res.render('signup', {title: 'Sign up'})
});

router.get('/success', (req, res) => {
    //console.log("/auth/  user: ", req.user)
    res.redirect('/')
});

module.exports = router;
