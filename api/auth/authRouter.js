const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

const { validateRegisterBody} = require('../validations');
const { getUserByEmail, saveUser } = require('../user/userModels');

const router = express.Router();

router.post('/register', [findUser, validateRegisterBody], (req, res) => {
  if (res.user) {
    res.status(400).json('Email is already associated with another account.');
    //do this during validation??
  } else {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    saveUser(credentials)
      .then(data => {
        res.status(201).json({ data: data })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(`Error saving user.`);
      })
  }
});

router.get('/login', findUser, (req, res) => {
  if (!res.user) {
    res.status(404).json({ error: `No account with that email was found.` })
  }
  else if (!bcrypt.compareSync(req.body.password, res.user[0].password)) {
    res.status(401).json({ error: 'Incorrect password.' });
  } else {
    const user = res.user[0];
    const token = generateToken(user);
    res.status(200).json({ token: token, id: user.id, type: user.type});
  }
});

function findUser(req, res, next) {
  getUserByEmail(req.body.email, true)
    .then(data => {
      res.user = data;
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(`Error searching for user by email.`);
    })
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    type: user.type,
    email: user.email,
    iat: Date.now()
  }
  const options = {
    expiresIn: '1d' //check jwt module docs to see other options
  }
  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
  //secrets.jwtSecret
}
module.exports = router;