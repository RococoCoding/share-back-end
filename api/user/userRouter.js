const express = require('express');
const { validateUser, protected, modsOnly } = require('../validations');

const router = express.Router();

router.get('/', [protected, modsOnly, validateUser], (req, res) => {
  res.status(200).json(res.user);
})




module.exports = router;