var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

/* --- V7: Using dotenv     --- */
require('dotenv').load();

/* --- FOR CARPOOLING     --- */
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var signup_passengerRouter = require('./routes/signup_passenger');
var signup_driverRouter = require('./routes/signup_driver');
var filter_ridesRouter = require('./routes/filter_rides');
var myRidesDriversRouter = require('./routes/myRides_drivers')
var create_rideRouter = require('./routes/create_rides');
var profile_passengerRouter = require('./routes/profile_passenger');
var profile_driverRouter = require('./routes/profile_driver');
var update_ridesRourter = require('./routes/update_rides');
var update_carRouter = require('./routes/update_car');
var insert_carRouter = require('./routes/insert_car');
var delete_carRouter = require('./routes/delete_car');
var logoutRouter = require('./routes/logout');
var update_bidsRouter = require('./routes/update_bids');
var edit_bidsRouter = require('./routes/edit_bids');
var convert_driverRouter = require('./routes/convert_driver');
var add_paymentcardRouter = require('./routes/add_paymentcard');
var add_preferenceRouter = require('./routes/add_preference');
var delete_preferenceRouter = require('./routes/delete_preference');
var pricecheckerRouter = require('./routes/create_rides_pricechecker');
var rate_ridesRouter = require('./routes/rate_rides');

var admin_allRideRouter = require('./routes/admin_allRides');
var admin_allUserRouter = require('./routes/admin_allUsers');
var admin_allBidRouter = require('./routes/admin_allBids');

var admin_createRideRouter = require('./routes/admin_create_ride');
var admin_updateRideRouter = require('./routes/admin_update_ride');
var admin_createBidRouter = require('./routes/admin_create_bid');
var admin_updateBidRouter = require('./routes/admin_update_bid');
var admin_updateUserRouter = require('./routes/admin_update_user');

/* ---------------------------- */


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  key: 'username',
  secret: 'sjfoeijfelf',
  resave: false,
  saveUninitialized: false,
  cookie: {expires: 300000}
}));

/* --- FOR CARPOOLING    --- */
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/myRides_drivers', myRidesDriversRouter)
/* ---------------------------- */

/* --- Modify Database  --- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* --- FOR CARPOOLING    --- */
app.use('/signup_passenger', signup_passengerRouter);
app.use('/signup_driver', signup_driverRouter);
app.use('/filter_rides', filter_ridesRouter);
app.use('/create_rides', create_rideRouter);
app.use('/profile_passenger', profile_passengerRouter);
app.use('/profile_driver', profile_driverRouter);
app.use('/update_rides', update_ridesRourter);
app.use('/update_car', update_carRouter);
app.use('/insert_car', insert_carRouter);
app.use('/delete_car', delete_carRouter);
app.use('/logout', logoutRouter);
app.use('/update_bids', update_bidsRouter);
app.use('/edit_bids', edit_bidsRouter);
app.use('/convert_driver', convert_driverRouter);
app.use('/add_paymentcard', add_paymentcardRouter);
app.use('/add_preference', add_preferenceRouter);
app.use('/delete_preference', delete_preferenceRouter);
app.use('/create_rides_pricechecker', pricecheckerRouter);
app.use('/rate_rides', rate_ridesRouter);

app.use('/admin_allRides', admin_allRideRouter);
app.use('/admin_allUsers', admin_allUserRouter);
app.use('/admin_allBids', admin_allBidRouter);

app.use('/admin_create_ride', admin_createRideRouter);
app.use('/admin_update_ride', admin_updateRideRouter);
app.use('/admin_create_bid', admin_createBidRouter);
app.use('/admin_update_bid', admin_updateBidRouter);
app.use('/admin_update_user', admin_updateUserRouter);

/* ---------------------------- */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
