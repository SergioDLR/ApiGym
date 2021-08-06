const router = require('express').Router();
const TrainingRoutine = require('../Schemas/traininigRoutine');
const Routine = require('../Schemas/routine');
//const routine = require('../Schemas/routine');

router.post('/:id', async (req, res) => {
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
      return res.status(202).json('No se encontro la rutina');
    }
    const savedDay = await routineDay.save();
    const rutinaAgregarDia = await Routine.findOneAndUpdate(
      { _id: id },
      { $inc: { cantidadDias: 1 }, $push: { entrenamientoDias: savedDay._id } },
      { new: true, useFindAndModify: false }
    ).populate('entrenamientoDias');

    res.status(200).json({
      rutinaGuardada: rutinaAgregarDia,
      mensaje: 'Se agrego un dia de entrenamiento con exito',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json('Hay algun error con la query');
  }
});
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ejercicioQuery = req.body.ejercicio;
    const diaRutinaEjercicioAgregado = await TrainingRoutine.findOneAndUpdate(
      { _id: id },
      { $push: { ejercicios: ejercicioQuery } },
      { new: true, useFindAndModify: false }
    );
    if (!diaRutinaEjercicioAgregado) {
      res.status(202).json('No se encontro el dia de rutina');
    }
    res.status(200).json({
      rutinaNueva: diaRutinaEjercicioAgregado,
      mensaje: 'Se agrego correctamente',
    });
  } catch (error) {
    res.status(400).json('Hay algun error con la query');
  }
});
module.exports = router;
