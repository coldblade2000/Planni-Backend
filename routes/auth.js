var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'));

router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

module.exports = router;
