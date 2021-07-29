const router = require('express').Router();
const User = require('../Schemas/user');

router.get('/', async (req, res) => {
  res.json({
    data: 'bienvenido',
  });
});
module.exports = router;
