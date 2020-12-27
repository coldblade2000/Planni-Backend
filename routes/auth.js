var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/auth'}),
    (req, res) => {
        console.log('Successful login: ', req.user)
        res.redirect('/auth/good')
    }
);



router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

router.get('/', (req, res) => {
    console.log("/auth/  user: ", req.user)
    res.render('login', {title: 'Login', user: req.user})
});

router.get('/good', (req, res) => {
    res.json(req.session)
});

module.exports = router;
