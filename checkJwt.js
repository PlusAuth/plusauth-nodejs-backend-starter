const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');

//jsonwebtoken options
const options = {
  audience: process.env.PLUSAUTH_AUDIENCE,
  issuer: `${process.env.PLUSAUTH_ISSUER}`, // Validate the issuer
  algorithms: ['RS256'], // Signing Algorithm
};

//jwks-rsa options
const jwksClient = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${process.env.PLUSAUTH_ISSUER}/.well-known/jwks.json`, // Signing Keys Uri
});

function getKey(header, callback) {
  jwksClient.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = (scope = null) => {
  return function (req, res, next) {
    // If token not present in request header return 401
    if (req.headers.authorization === undefined) {
      return res.status(401).json({ message: 'token not found' });
    }

    // Get Bearer token
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, getKey, options, function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: err.message }); // return 401 if token validation failed
      }

      if (!scope) {
        // If scope not present for route, then return response since token validated successfully
        next();
      } else if (decoded.scope && decoded.scope.split(' ').includes(scope)) {
        // If scope present for the route and token has required scope then return response
        next();
      } else {
        // If scope present for the route but token doesn't have required scope then return 403
        return res.status(403).json({ message: 'Insufficient scope' });
      }
    });
  };
};
