module.exports = role => { //pass in a role like maybe a student?
  // return middleware
  return function(req, res, next) {
    // make sure the roles property is in the toke's payload and that the desired role is present
    if(req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
      next();
    } else {
      // return a 403 forbidden, the user is logged in, but has no access
      res.status(403).json({ message: 'you are not allowed' });
    }
  }
}