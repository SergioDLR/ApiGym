const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  surname: { type: String, required: true, min: 5, max: 255 },
  email: { type: String, required: true, min: 5, max: 1024 },
  password: { type: String, required: true, min: 5, max: 255 },
  fechaDeNacimiento: { type: Date, required: true },
  fechaDeCreacionCuenta: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', userSchema);
