const router = require('express').Router();
const User = require('../Schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
  name: Joi.string().min(1).max(35).required(),
  surname: Joi.string().min(1).max(35).required(),
  email: Joi.string().min(6).max(255).required().email().messages({
    'string.email': 'El campo email tiene que tener un email valido',
  }),
  password: Joi.string().min(6).max(1024).required(),
});
router.post('/', async (req, res) => {
  const { error } = schemaRegister.validate(req.body.user);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const findEmail = await User.findOne({
    email: req.body.user.email.toLowerCase(),
  });

  if (findEmail) {
    return res.status(400).json({ error: 'email ya  registrado' });
  }

  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const passwordSalted = await bcrypt.hash(req.body.user.password, salt);
    const registerUser = new User({
      name: req.body.user.name.toLowerCase(),
      surname: req.body.user.surname.toLowerCase(),
      email: req.body.user.email.toLowerCase(),
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
