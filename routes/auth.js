var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/google', [(req, res, next) => {
    req.session.desiredusername = req.query.username;
    next()
}, passport.authenticate('google', {
    scope: ['profile', 'email']
})]);

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
        //console.log('Successful login: ', req)
        res.redirect('/auth/success')
    }
);


router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

router.get('/login', (req, res) => {
    //console.log("/auth/  user: ", req.user)
    res.render('login', {title: 'Login', user: req.user})
});

router.get('/signup', (req, res) => {
    //console.log("/auth/  user: ", req.user)
    res.render('signup', {title: 'Sign up'})
});

router.get('/success', (req, res) => {
    console.log("/auth/  user: ", req.user)
    res.redirect('/')
});

module.exports = router;
