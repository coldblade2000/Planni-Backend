import {User} from "../MongoDB/models/models";
const passport = require('passport')
var express = require('express');
var router = express.Router();

router.get('/:id', passport.authenticate('jwt'), async function (req, res) {
    if (req.user && req.params.id === req.user._id) {
        await User.findById(req.user._id).exec().then((user => {
            if (user) return res.status(200).send(user);
            res.status(404).send("ERROR 404 Not Found! The user was authenticated, but is not present in the database.")
        }))
    } else {
        const msg = (!req.user) ? "ERROR 401 Unauthorized! You are not logged in! " : 'You are not logged in as: ' + req.params.id;
        return res.status(401).send(msg)
    }
})

router.get('/', passport.authenticate('jwt'), async function (req, res) {
    if (req.user) {
        await User.findById(req.user._id).populate('planIDs').exec().then((user => {
            if (user) return res.status(200).send(user);
            res.status(404).send("ERROR 404 Not Found! The user was authenticated, but is not present in the database.")
        }))
    } else {
        const msg = (!req.user) ? "ERROR 401 Unauthorized! You are not logged in! " : 'You are not logged in as: ' + req.params.id;
        return res.status(401).send(msg)
    }

})

module.exports = router;
