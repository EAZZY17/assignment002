var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
var express = require('express');
var cors = require('cors');
var createError = require('http-errors');
var logger = require('morgan');
var configDb = require('./config/db');

var indexRouter     = require('./routers/index-router');
var contactRouter   = require('./routers/contacts-router');
var projectsRouter  = require('./routers/projects-router');
var servicesRouter  = require('./routers/service-router');
var usersRouter     = require('./routers/users-router');

var app = express();

configDb(); // connect to MongoDB

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root message route (required by assignment screenshot)
app.use('/', indexRouter);

// resource routers
app.use('/api/contacts',  contactRouter);
app.use('/api/projects',  projectsRouter);
app.use('/api/services',  servicesRouter);
app.use('/api/users',     usersRouter);

// 404 forwarder
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler (last middleware)
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}/`));
