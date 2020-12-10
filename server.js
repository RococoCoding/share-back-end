const express = require('express');
const bcrypt = require('bcryptjs');
const userRouter = require('./api/user/userRouter');
const itemRouter = require('./api/item/itemRouter');

const server = express();
server.use(express.json());
server.use('api/user', userRouter);
server.use('api/item', itemRouter);

server.post('/register', (req, res) => {
  // find user first then...

  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  //... save user
});

server.get('/login', (req, res) => {
  if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
    return res.status(401).json({error: 'incorrect credentials'});
  } else {
    //return token and user info
  }
});

module.exports = server;