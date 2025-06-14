const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser'); //required for csrf
const csurf = require('csurf');
const helmet = require('helmet');
const routes = require('./routes');

const { restoreUser } = require('./utils/auth');


//check if in production mode
const { environment } = require('./config');
const isProduction = environment === 'production';

//initialize Express application
const app = express();

//catch sequelize errors
const { ValidationError } = require('sequelize');


//logging requests and responses
app.use(morgan('dev'));

//parse cookies and json bodies
app.use(cookieParser());
app.use(express.json());

// Security Middleware
const allowedOrigins = [
  'https://app-academy-projects-frontend.onrender.com',
  'http://localhost:5173'
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

// provide CSRF token to frontend in development
if (!isProduction) {
  app.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.status(200).json({});
  });
}

  //connect API routes
  app.use(routes);



// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });


// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});



// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    //console.error(err);
    res.json({
      //title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors || {},
      //stack: isProduction ? null : err.stack
    });
  });
  const path = require('path');

  if (isProduction) {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
    });
  }
  
  module.exports = app;


