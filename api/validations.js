const { getUserById } = require('./user/userModels');
const secrets = require('../config/secrets');
const jwt = require('jsonwebtoken');

module.exports = {
  validateUser,
  validateRegisterBody,
  validateEditBody,
  protected,
  modsOnly,
  selfOnly,
  modsOrSelf
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

function selfOnly(req, res, next) {
  if (res.token.subject == req.params.id) {
    next();
  } else {
    res.status(401).json(`You are not authorized.`);
  }
}

function modsOrSelf(req, res, next) {
  if (res.token.type == 1 || res.token.subject == req.params.id) {
    next();
  } else {
    res.status(401).json(`You are not authorized.`);
  }
}

function modsOnly(req, res, next) {
  if (res.token.type == 1) {
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

function validateRegisterBody(req, res, next) {
  return checkBody(req.body, res, next, ["name", "password", "type", "email", "suspend"]);
}

function validateEditBody(req, res, next) {
  return checkBody(req.body, res, next, ["email", "password"]);
}


// helper function
function checkBody(body, res, next, reqFields) {
  const fieldsReceived = Object.keys(body);
  const requiredFields = reqFields;
  const missingFields = [];
  for (let i of requiredFields) {
    if (!fieldsReceived.includes(i)) {
      missingFields.push(i);
    }
  }
  if (missingFields.length > 0) {
    res.status(400).json(`Input is missing fields: ${missingFields}.`)
  } else {
    next();
  }
}