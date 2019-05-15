
const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
  // tokens are commonly sent as the authorization header
  const token = req.headers.authorization;

  if (token) {// is it available
    // is it valid?
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // if there is an error token is not valid
        res.status(401).json({ message: 'Nope!' }) //dont be to descriptive on token error for hackers
      } else {
        // the token is valid and was successfully decoded
        req.decodedJwt = decodedToken; // make it avilable to the rest of our API
        console.log('decoded token', req.decodedJwt);//make sure the Jwt match is case sensitive

        next();
      }
    })
  } else {
    // no token?
    res.status(401).json({ message: "Nope!" });
  }
 
};
