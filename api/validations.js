const { getUserById } = require('./user/userModels');
const secrets = require('../config/secrets');
const jwt = require('jsonwebtoken');

module.exports = {
  validateUser,
  protected,
  modsOnly,
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  !token && res.status(401).json(`Missing authorization token.`);
  jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
    err && res.status(500).json(`Could not verify JWT.`);
    res.token = decoded;
    next();
  })
}

function modsOnly(req, res, next) {
  if (res.token.type === 1) {
    next();
  } else {
    res.status(401).json(`You are not authorized.`);
  }
}

function validateUser(req, res, next) {
  getUserById(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).json('Could not find user.')
      } else {
        res.user = data;
        next();
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(`Error searching for user.`)
    })
}