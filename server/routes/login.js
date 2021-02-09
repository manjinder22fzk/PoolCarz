/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
const express = require('express');

const router = express.Router();
const UsersList = require('../models/UsersSchema');

router.post('/', function (req, res, next) {
  const creds = req.body;
  UsersList.find(function (err, doc) {
    for (let i = 0; i < doc.length; i++) {
      if (
        doc[i].username === creds.username &&
        doc[i].password === creds.password
      ) {
        res.send({
          message: 'Login Successful',
        });
      } else {
        res.send({
          message: 'Credential Mismatch',
        });
      }
    }
  });
});

module.exports = router;
