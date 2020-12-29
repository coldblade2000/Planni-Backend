import {User} from "../MongoDB/models/models";

var express = require('express');
var router = express.Router();

router.get('/:id', async function (req, res) {
    if (req.user && req.params.id === req.user._id) {
        await User.findById(req.user._id).exec().then((user => {
            if (user) return res.send(user);
            res.status(404).send("ERROR 404 Not Found! The user was authenticated, but is not present in the database.")
        }))
    } else {
        const msg = (!req.user) ? "ERROR 401 Unauthorized! You are not logged in! " : 'You are not logged in as: ' + req.params.id;
        res.status(401).send(msg)
    }
    /*const query = await CourseModel.findOne({courseIdentifier: req.params.id}).exec()
    res.send(query)*/
})

module.exports = router;
