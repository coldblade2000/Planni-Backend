var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect: '/auth'}),
    (req, res) => {
        console.log('Successful login: ' + req)
        res.redirect('/')
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

router.get('/', (req, res) => {
    res.render('login', {title: 'Login', user: req.user})
});

module.exports = router;
