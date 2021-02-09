const mongoose = require('mongoose');
const OffersList = require('./models/OffersSchema');
const RidesList = require('./models/RidesSchema');
const UsersList = require('./models/UsersSchema');

mongoose.connect('mongodb://mongodb-service/cloud1', function () {
  console.log('db connected');
  mongoose.connection.db.dropDatabase();

  const rides = [

    {
      rideId: 1001,
      riderName: 'admin',
      rideeName: 'Money',
      pickUp: 'Infosys',
      destination: 'Hyderabad',
      status: 'booked'
    },
    {
      rideId: 1002,
      riderName: 'kalpana',
      rideeName: 'Abhishek',
      pickUp: 'Banglore',
      destination: 'Chennai',
      status: 'booked'
    },
    {
      rideId: 1003,
      riderName: 'krishna',
      rideeName: 'Amulya',
      pickUp: 'Dehradun',
      destination: 'Gurgaon',
      status: 'booked'
    },
  ]

  rides.forEach(function (ride) {
    new RidesList(ride).save();
  });

  const users = [
    {
      username: 'krishna',
      password: 'krishna',
    },
    {
      username: 'kalpana',
      password: 'kalpana',
    },
    {
      username: 'admin',
      password: 'admin',
    },
  ];
  users.forEach(function (user) {
    new UsersList(user).save();
  });

  const offers = [
    {
      offerId: 1000,
      name: 'Krishna',
      car: 'Swift',
      seatsLeft: 2,
      pickUp: 'MNG SEZ',
      destination: 'Pumpwell',
    },
    {
      offerId: 1001,
      name: 'Shiva',
      car: 'Audi',
      seatsLeft: 3,
      pickUp: 'MNG SEZ',
      destination: 'Kottara',
    },
    {
      offerId: 1002,
      name: 'Preethi',
      car: 'Huidai i10',
      seatsLeft: 2,
      pickUp: 'Hampankatta',
      destination: 'MNG SEZ',
    },
    {
      offerId: 1003,
      name: 'Deepak',
      car: 'Range Rover',
      seatsLeft: 1,
      pickUp: 'MNG SEZ',
      destination: 'MNG STP',
    },
    {
      offerId: 1004,
      name: 'Money',
      car: 'Kia Seltos',
      seatsLeft: 3,
      pickUp: 'Infosys',
      destination: 'Mohali',
    },
    {
      offerId: 1005,
      name: 'Abhishek',
      car: 'Kia Sonet',
      seatsLeft: 2,
      pickUp: 'Mohali',
      destination: 'Infosys',
    },
    {
      offerId: 1006,
      name: 'Amulya',
      car: 'Range Rover',
      seatsLeft: 4,
      pickUp: 'Hyderabad',
      destination: 'Infosys',
    },
    {
      offerId: 1007,
      name: 'Prashant',
      car: 'Creta',
      seatsLeft: 4,
      pickUp: 'Infosys',
      destination: 'Gurgaon',
    }    
    
  ];

  offers.forEach(function (offer, index) {
    offer.id = index;
    new OffersList(offer).save();
  });

  console.log('data stored successfully');
});
