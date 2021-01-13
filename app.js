import {BACKEND_PASSWORD, LOGIN_INFO, SESSION_SECRET} from "./secrets";
import * as mongoose from "mongoose";
import {MONGODB_ADDRESS} from "./constants";

const express = require('express');
const path = require('path');
const session = require("express-session");
const cors = require('cors')
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongoStore = require('connect-mongo')(session);

const passport = require('./model/auth')
const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const planRouter = require('./routes/plan');

const app = express();

// view engine setup
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
console.log('Started server!')
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

mongoose.connect(`mongodb://${MONGODB_ADDRESS}`, {
    user: 'backend',
    pass: BACKEND_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(_ => console.log('Connected Successfully to MongoDB'))
    .catch(err => console.error(err));

const sessionConfig = {
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
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
app.use(cors());


app.use('/', indexRouter);
app.use('/courses', coursesRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter)
app.use('/plan', planRouter)

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
