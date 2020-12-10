const db = require('../../data/dbconfig');

module.exports = {
  getUserById,
  getUserByEmail,
  saveUser
}
function getUserById(id) {
  return db('user')
    .where({id})
    .then(data => {
      if (data.length === 0) {
        return Promise.resolve(null);
      } else {
        return Promise.resolve(data);
      }
    })
}

function getUserByEmail(email) {
  return db('user')
    .where({email})
    .then(data => {
      if (data.length === 0) {
        return Promise.resolve(null);
      } else {
        return Promise.resolve(data);
      }
    })
}

function saveUser(body) {
  return db('user')
    .insert(body)
    .then(id => {
      return getUserById(id);
    })
}