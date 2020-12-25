import {cookie_session} from "./secrets";
import * as mongoose from "mongodb";

const cors = require('cors')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');

const session = require('express-session')
const passport = require('passport')
const {GOOGLE, SESSION_SECRET, cookie_session} = require("./secrets");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
const {User} = require('./MongoDB/models/models')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log('Started server!')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

try {
    mongoose.connect('mongodb://localhost:27017/banner', {useNewUrlParser: true, useUnifiedTopology: true}).then(
        () => {
            console.log('Successful connection to mongodb!');
        },
        err => {
            console.log(err)
        }
    );

} catch (e) {
    console.log('ERROR:Mongoose: ' + e)
}

const sessionConfig = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
//https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4
app.use(cookieSession({
    maxAge: 24 * 3600 * 1000,
    keys: [cookie_session]
}))
app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
        clientID: GOOGLE.GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser)
            } else {
                new User({
                    googleId: profile.id
                }).save().then((newUser) => {
                    done(null, newUser)
                })
            }
        })
    }))

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
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
    res.render('views/error');
});

module.exports = app;
