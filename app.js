const cors = require('cors')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');

const session = require('express-session')
const passport = require('passport')
const {GOOGLE, SESSION_SECRET} = require("./secrets");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {User} = require('./MongoDB/models/models')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
        clientID: GOOGLE.GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },
    accessToken => {
        console.log('access token: ', accessToken)
    }))

app.use(cors());
app.use('/', indexRouter);
app.use('/courses', coursesRouter);

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
