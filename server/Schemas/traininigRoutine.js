const mongoose = require('mongoose');

const trainingRoutine = mongoose.Schema({
  fechaDeCreacion: { type: Date, default: Date.now },
  routineId: { type: ObjectId, required: true },
  ejercicio: [
    {
      nombre: { type: String, requiered: true },
      repeticiones: { type: integer, required: true },
      series: { type: integer, required: true },
    },
  ],
});
module.exports = mongoose.model('Routine', trainingRoutine);
