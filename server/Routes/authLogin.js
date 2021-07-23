const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../Schemas/user');
const bcrypt = require('bcrypt');
router.post('/', async (req, res) => {
  // validaciones
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: 'contraseña no válida' });

  // create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.header('auth-token', token).json({
    error: null,
    data: { token },
  });
});

router.get('/', (req, res) => {
  res.json({
    estado: true,
    mensaje: 'funciona!',
  });
});

module.exports = router;
