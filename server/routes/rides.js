/* eslint-disable array-callback-return */
const express = require('express');

const router = express.Router();
const Offers = require('../models/OffersSchema');

router.get('/', function (req, res, next) {
  Offers.find(function (err, availableOffers) {
    res.send(availableOffers);
  });
});

module.exports = router;
