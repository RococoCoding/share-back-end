const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', (req, res) => {
  // find user first then...

  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  //... save user
});

router.get('/login', (req, res) => {
  if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
    return res.status(401).json({error: 'incorrect credentials'});
  } else {
    //return token and user info
  }
});
