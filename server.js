const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const bodyParser = require('body-parser');

require('dotenv').config();
(async () => {
  const app = express();

  app.use(cors());

  const checkJwt = jwt({
    // Singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.PLUSAUTH_ISSUER}/.well-known/jwks.json`, // Signing Keys Uri
    }),
    audience: process.env.PLUSAUTH_AUDIENCE, // Validate the audience
    issuer: `${process.env.PLUSAUTH_ISSUER}`, // Validate the issuer
    algorithms: ['RS256'], // Signing Algorithm
  });

  // Enable the use of request body parsing middleware
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // get users API endpoint (scope= users:read)
  app.get('/users', checkJwt, jwtAuthz(['users:read']), function (req, res) {
    //send the response
    res.status(200).send('All Users List');
  });

  // create user API endpoint (scope= users:write)
  app.post('/users', checkJwt, jwtAuthz(['users:write']), function (req, res) {
    //send the response
    res.status(200).send('New User Created');
  });

  // update user API endpoint (scope= users:update)
  app.put('/users', checkJwt, jwtAuthz(['users:update']), function (req, res) {
    //send the response
    res.status(200).send('User Updated');
  });

  // update user API endpoint (scope= users:delete)
  app.delete(
    '/users',
    checkJwt,
    jwtAuthz(['users:delete']),
    function (req, res) {
      //send the response
      res.status(200).send('User Deleted');
    }
  );

  app.use(function (err, req, res, next) {
    return res
      .set(err.headers)
      .status(err.status)
      .json({ message: err.message });
  });

  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(
      'Application started at http://localhost:' + listener.address().port
    );
  });
})();
