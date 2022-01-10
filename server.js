const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const checkJwt = require('./checkJwt');

require('dotenv').config();
(async () => {
  const app = express();

  // Accept all origins
  app.use(cors());

  // Enable the use of request body parsing middleware
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // get users API endpoint (scope= users:read)
  app.get('/users', checkJwt('users:read'), function (req, res) {
    //send the response
    res.status(200).send('All Users List');
  });

  // create user API endpoint (scope= users:write)
  app.post('/users', checkJwt('users:write'), function (req, res) {
    //send the response
    res.status(200).send('New User Created');
  });

  // update user API endpoint (scope= users:update)
  app.put('/users', checkJwt('users:update'), function (req, res) {
    //send the response
    res.status(200).send('User Updated');
  });

  // update user API endpoint (scope= users:delete)
  app.delete('/users', checkJwt('users:delete'), function (req, res) {
    //send the response
    res.status(200).send('User Deleted');
  });

  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(
      'Application started at http://localhost:' + listener.address().port
    );
  });
})();
