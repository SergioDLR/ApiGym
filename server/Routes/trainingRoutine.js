const router = require("express").Router();
const Routine = require("../Schemas/routine");
const TrainingRoutine = require("../Schemas/traininigRoutine");
const Training = require("../Schemas/training");

router.post("/", async (req, res) => {
  try {
    const ejercicios = req.body.ejercicios;
    const idUsuario = req.user.id;
    const rutinaId = req.body.rutinaId;
    const time = req.body.tiempo;
    const createTraining = await new Training({
      routineId: rutinaId,
      ejerciciosRealizados: ejercicios,
      userId: idUsuario,
      tiempo: time,
    });
    createTraining.save();
    res
      .status(200)
      .json({ mensaje: "Entrenamiento guardado", result: createTraining });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "Ocurrio un error en la query" });
  }
});

router.get("/", async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const resultadoBusqueda = await Training.find({ userId: idUsuario });
    if (resultadoBusqueda.length > 0) {
      res.status(200).json({
        mensaje: "Entrenamiento encontrados",
        result: resultadoBusqueda,
      });
    } else {
      res.status(400).json({
        mensaje: "Este usuario no tiene entrenamientos",
        result: resultadoBusqueda,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "Ocurrio un error en la query" });
  }
});

router.get("/rutina/:id", async (req, res) => {
  try {
    const idRutina = req.params.id;
    const idUsuario = req.user.id;
    const resultadoBusqueda = await Training.find({
      userId: idUsuario,
      routineId: idRutina,
    });
    if (resultadoBusqueda.length > 0) {
      res.status(200).json({
        mensaje: "Entrenamiento encontrados",
        result: resultadoBusqueda,
      });
    } else {
      res.status(400).json({
        mensaje: "Esta rutina no tiene entrenamientos",
        result: resultadoBusqueda,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "Ocurrio un error en la query" });
  }
});
module.exports = router;
