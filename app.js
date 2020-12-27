import {cookie_session} from "./secrets";
import * as mongoose from "mongoose";

const express = require('express');
const path = require('path');
const cors = require('cors')
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");

const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');
const passport = require('passport')
const {GOOGLE, SESSION_SECRET, cookie_session} = require("./secrets");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {User} = require('./MongoDB/models/models')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
console.log('Started server!')
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
const sessionConfig = {
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
//https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4
/*app.use(cookieSession({
    maxAge: 7* 24 * 3600 * 1000,
    keys: [cookie_session],
    secure:false
}))*/
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/banner', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(_ => console.log('Connected Successfully to MongoDB'))
    .catch(err => console.error(err));

passport.use(new GoogleStrategy({
        clientID: GOOGLE.GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        //console.log("Got to verify. Profile: ", profile)
        User.findOne({googleId: profile.id})
            .then((currentUser) => {
                if (currentUser) {
                    console.log("Found currentUser: "+ currentUser)
                    if (currentUser.realName === undefined && profile.displayName){
                        currentUser.realName = profile.displayName;
                        currentUser.save()
                    }
                    return done(null, currentUser)
                } else {
                    console.log(profile)
                    new User({
                        'email': profile.emails[0].value,
                        "realName": profile.displayName,
                        'googleId': profile.id
                    }).save().then((newUser) => {
                        return done(null, newUser)
                    })
            }
        })
    }))

passport.serializeUser((user, done) => {
    console.log("Serialize user: " + user)

    done(null, user["_id"]);
});
passport.deserializeUser((id, done) => {
    console.log("Deserialize ID: " + id)
    User.findById(id).then(user => {
        done(null, user);
    });
});


app.use(cors());
app.use('/', indexRouter);
app.use('/courses', coursesRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
