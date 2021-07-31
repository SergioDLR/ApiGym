const router = require('express').Router();
const User = require('../Schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/', async (req, res) => {
  const findEmail = await User.findOne({ email: req.body.user.email });

  if (findEmail) {
    return res.status(400).json({ error: 'email ya  registrado' });
  }

  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const passwordSalted = await bcrypt.hash(req.body.user.password, salt);
    const registerUser = new User({
      name: req.body.user.name,
      surname: req.body.user.surname,
      email: req.body.user.email,
      password: passwordSalted,
    });
    const savedUser = await registerUser.save();
    const token = jwt.sign(
      {
        name: savedUser.name,
        id: savedUser._id,
      },
      process.env.TOKEN_SECRET
    );
    res.status(200).json({
      error: null,
      data: token,
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
