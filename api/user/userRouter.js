const express = require('express');
const { validateUser, protected, selfOnly, modsOrSelf } = require('../validations');
const { deleteUser, updateUser, getUserByType } = require('../user/userModels');

const router = express.Router();

router.get('/', [protected, validateUser], (req, res) => {
  res.status(200).json(res.user);
})

router.get('/:id', [protected, validateUser], (req, res) => {
  res.status(200).json(res.user);
})

router.get('/type/:id', [protected], (req, res) => {
  getUserByType(req.params.id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json(`Error retrieving users by type.`);
  })
})
 
router.put('/:id', [protected, selfOnly, validateUser], (req, res) => {
  updateUser(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(`Error updating user.`);
    })
})

router.delete('/:id', [protected, modsOrSelf, validateUser], (req, res) => {
  deleteUser(req.params.id)
    .then(data => {
      res.status(200).json({deleted: data});
    })
    .catch(err => {
      res.status(500).json(`Error deleting user.`);
    })
})




module.exports = router;