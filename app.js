const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const mongoDB = keys.DB_URL;
require('./config/passport');

// Routers
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');

// Create express app
const app = express();

// Setup defualt mongoose connection
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection error)
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', function () {
  console.log('Connected to mongoDB.');
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Mongo store for session data
app.use(session({
  secret: 'randomPassword',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 900000
  },
  store: new MongoStore({
    url: mongoDB,
    collection: 'sessions'
  })
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/dashboard', dashboardRouter);
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

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


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
module.exports = app;
