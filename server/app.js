/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Offers = require('./models/OffersSchema');
const UsersList = require('./models/UsersSchema');
const Rides = require('./models/RidesSchema');
const database = require('./database');

const app = express();

app.use(cors());

mongoose.connect(
  `mongodb://mongodb-service/cloud1`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.disable('x-powered-by');
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,Authorization ,Accept'
  );
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/login', function (req, res) {
  const creds = req.body;
  let ret = {};
  UsersList.find(function (err, doc) {

    for (let i = 0; i < doc.length; i++) {
      
      if (
        doc[i].username === creds.userName &&
        doc[i].password === creds.password
      ) {
        ret = {
          message: 'Login successful',
          status: 200,
        };
        res.send(ret);
      }
    }
  });
});

app.get('/show_rides', function (req, res, next) {
  Offers.find(function (err, availableOffers) {
    res.send(availableOffers);
  });
});

app.post('/book_ride', function (req, res) {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  Rides.find(function (err, doc) {
    const newRide=new Rides({
      rideId: doc.length + 1001,
      riderName: body.rider.name,
      rideeName: body.ridee,
      pickUp: body.rider.pickUp,
      destination: body.rider.destination,
      status: 'booked',
    });
    newRide.save(function (err,success){
      if(err){
        res.send(err)
      }
      Offers.update(
        { name: body.rider.name },
        { $inc: { seatsLeft: -1 } },
        function () {
          res.send({
            id: doc.length + 1001,
            seatsLeft: body.rider.seatsLeft - 1,
            message: 'Ride booked successfully',
            status: 200,
          });
        }
      );
    })
  });
});

app.post('/cancel_ride', function (req, res) {
  const params = req.body;
  console.log("Params are ",params)
  console.log("Type of rideid:",typeof params.rideId)
  Rides.find(function (err, doc) {
    Rides.update(
      { rideId: params.rideId },
      { $set: { status: 'cancelled' } },
      function (err, raw) {
        Offers.update(
          { name: params.name },
          { $inc: { seatsLeft: 1 } },
          function () {
            Offers.find(function (err, availableOffers) {
              res.send({
                message: 'Ride cancelled successfully',
                status: 200,
              });
            });
          }
        );
      }
    );
  });
});

app.post('/offer_ride', function (req, res) {
  console.log('inside offer_ride', req.body);
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  Offers.find(function (err, doc) {
    const newOffer = new Offers({
      id: doc.length + 1,
      name: body.name,
      car: body.car,
      seatsLeft: body.seatsLeft,
      pickUp: body.pickUp,
      destination: body.destination,
    });
    newOffer.save(function (err, success) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: 'Offer added successfully',
        status: 200,
      });
    });
  });
});

app.use(function (req, res, next) {
  console.log('not found');
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000, '0.0.0.0', function () {
  console.log(`Listening to port:  ${5000}`);
});

module.exports = app;