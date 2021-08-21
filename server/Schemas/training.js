const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const TrainingSchemma = mongoose.Schema({
  routineId: { type: ObjectId, ref: "Routine", required: true },
  userId: { type: ObjectId, required: true },
  fecha: { type: Date, default: Date.now },
  tiempo: { type: String, required: true },
  ejerciciosRealizados: [
    {
      nombre: { type: String, requiered: true },
      repeticiones: { type: Number, required: true },
      series: { type: Number, required: true },
      peso: { type: Number, required: true },
      descripcion: { type: String, requiered: true }
    }
  ]
});
module.exports = mongoose.model("Training", TrainingSchemma);
