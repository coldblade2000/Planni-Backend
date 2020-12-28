import {cookie_session, SESSION_SECRET} from "./secrets";
import * as mongoose from "mongoose";

const express = require('express');
const path = require('path');
const cors = require('cors')
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");

require('./model/auth')
const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const passport = require('passport')
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

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/banner', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(_ => console.log('Connected Successfully to MongoDB'))
    .catch(err => console.error(err));



app.use(cors());
app.use('/', indexRouter);
app.use('/courses', coursesRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter)

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
