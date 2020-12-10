const db = require('../../data/dbconfig');

module.exports = {
  getUserById,
  getUserByEmail,
  saveUser
}

function getUserById(id) {
  if (!id) {
    return db('user')
    .select('type', 'name', 'email', 'id', 'address', 'phone', 'suspend')
  } else {
    return db('user')
      .where({ id })
      .select('type', 'name', 'email', 'id', 'address', 'phone', 'suspend')
      .then(data => {
        if (data.length === 0) {
          return Promise.resolve(null);
        } else {
          return Promise.resolve(data);
        }
      })
  }
}
function getUserByEmail(email, returnPassword) {
  if (returnPassword) {
     return db('user')
    .where({ email })
    .then(data => {
      if (data.length === 0) {
        return Promise.resolve(null);
      } else {
        return Promise.resolve(data);
      }
    })
  } else {
    return db('user')
    .where({ email })
    .select('type', 'name', 'email', 'id', 'address', 'phone', 'suspend')
    .then(data => {
      if (data.length === 0) {
        return Promise.resolve(null);
      } else {
        return Promise.resolve(data);
      }
    })
  }
}

function saveUser(body) {
  return db('user')
    .insert(body)
    .then(id => {
      return getUserById(id);
    })
}