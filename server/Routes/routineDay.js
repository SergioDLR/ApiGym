const router = require("express").Router();
const TrainingRoutine = require("../Schemas/traininigRoutine");
const Routine = require("../Schemas/routine");
//const routine = require('../Schemas/routine');

router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const routineDay = new TrainingRoutine({
      routineId: id,
      nombre: req.body.nombre,
    });

    const buscarRutina = await Routine.findOne({
      _id: id,
    });
    if (!buscarRutina) {
      return res.status(202).json("No se encontro la rutina");
    }
    const savedDay = await routineDay.save();
    const rutinaAgregarDia = await Routine.findOneAndUpdate(
      { _id: id },
      { $inc: { cantidadDias: 1 }, $push: { entrenamientoDias: savedDay._id } },
      { new: true, useFindAndModify: false }
    ).populate("entrenamientoDias");

    res.status(200).json({
      rutinaGuardada: rutinaAgregarDia,
      mensaje: "Se agrego un dia de entrenamiento con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Hay algun error con la query");
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ejercicioQuery = req.body.ejercicio;
    const diaRutinaEjercicioAgregado = await TrainingRoutine.findOneAndUpdate(
      { _id: id },
      { $push: { ejercicios: ejercicioQuery } },
      { new: true, useFindAndModify: false }
    );
    if (!diaRutinaEjercicioAgregado) {
      return res.status(202).json("No se encontro el dia de rutina");
    } else {
      const resultado = await Routine.findOne({
        _id: diaRutinaEjercicioAgregado.routineId,
      }).populate("entrenamientoDias");

      res.status(200).json({
        rutinasActualizadas: resultado,
        mensaje: "Se agrego correctamente",
      });
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Hay algun error con la query" });
  }
});
router.delete("/ejercicio/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ejercicioAEliminar = req.body.ejercicio;
    const diaDeEjercicio = await TrainingRoutine.findOneAndUpdate(
      { _id: id },
      { $pull: { ejercicios: ejercicioAEliminar } },
      { new: true, useFindAndModify: false }
    );
    if (!diaDeEjercicio) {
      return res.status(202).json("No se encontro el dia de rutina");
    }

    res.status(200).json({
      rutinaNueva: diaRutinaEjercicioAgregado,
      mensaje: "Se agrego correctamente",
    });
  } catch (error) {
    res.status(400).json({ mensaje: "Hay algun error con la query" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const diaDeRutina = req.body;

    const result = await TrainingRoutine.deleteOne({ _id: id });
    if (!result) {
      return res
        .status(202)
        .json({ mensaje: "no se encontro ningun dia para eliminar" });
    }
    const rutinaActualizada = await Routine.findOneAndUpdate(
      { _id: diaDeRutina.routineId },
      { $pull: { entrenamientoDias: id } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({
      rutina: rutinaActualizada,
      mensaje: "Dia de entremiento eliminado con exito",
    });
  } catch (error) {
    res.status(400).json({ mensaje: "Hay algun error con la query" });
  }
});
module.exports = router;
