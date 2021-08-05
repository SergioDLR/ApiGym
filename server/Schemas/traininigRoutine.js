const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const trainingRoutine = mongoose.Schema({
  fechaDeCreacion: { type: Date, default: Date.now },
  routineId: { type: ObjectId, required: true },
  nombre: { type: String, required: true },
  ejercicios: [
    {
      nombre: { type: String, requiered: true },
      repeticiones: { type: Number, required: true },
      series: { type: Number, required: true },
    },
  ],
});
module.exports = mongoose.model('TrainingRoutine', trainingRoutine);
