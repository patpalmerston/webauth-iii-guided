const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line being added to require library
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token..`, token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// function to generate token
function generateToken(user) {
  const payload = {
    subject: user.id, // this is what the token is about
    username: user.username,
    // any other data we want to add.. lets ad roles for students
    roles: ['Student'], // normally it would come from an axios call from a database. But this is hard coded for an example
  }

  const options = {
    expiresIn: '1d',// this is one day not id
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
