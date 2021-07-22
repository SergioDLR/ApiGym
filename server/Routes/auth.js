const router = require('express').Router();
const User = require('../Schemas/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const findEmail = await User.findOne({ email: req.body.email });

  if (findEmail) {
    console.log(findEmail);
    return res.json({
      error: 'Email ya registrado',
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordSalted = await bcrypt.hash(req.body.user.password, salt);
    const registerUser = new User({
      name: req.body.user.name,
      surname: req.body.user.surname,
      email: req.body.user.email,
      password: passwordSalted,
      fechaDeNacimiento: req.body.user.fechaDeNacimiento,
    });
    const savedUser = await registerUser.save();
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/', (req, res) => {
  res.json({
    estado: true,
    mensaje: 'funciona!',
  });
});
module.exports = router;
