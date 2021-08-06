const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const routineSchema = mongoose.Schema({
  fechaDeCreacion: { type: Date, default: Date.now },
  name: { type: String, required: true },
  userId: { type: ObjectId, required: true },
  cantidadDias: { type: Number, default: 0 },
  entrenamientoDias: [{ type: ObjectId, ref: 'TrainingRoutine' }],
});
module.exports = mongoose.model('Routine', routineSchema);
