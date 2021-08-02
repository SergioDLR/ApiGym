const router = require('express').Router();
const Routine = require('../Schemas/routine');
const jwt = require('jsonwebtoken');
router.post('/', async (req, res) => {
  try {
    Routine.find({ name: req.body.name }, function (error, result) {
      if (result.length > 0) {
        res
          .status(400)
          .json({ error: 'Ya tienes una rutina con ese nombre' })
          .end();
      } else {
        const rotineReq = new Routine({
          name: req.body.name,
          userId: req.user.id,
        });
        rotineReq.save();
        res.status(200).json('Rutina guardada').end();
      }
    });
  } catch {
    console.log('ocurrio un error');
    res.status(400).json({ error: 'Faltan parametros en la query' }).end();
  }
});

router.get('/', (req, res) => {
  const id = req.user.id;
  const result = Routine.find(
    {
      userId: id,
    },
    function (error, result) {
      if (result.length > 0) {
        res.status(200).json(result).end();
      } else {
        res
          .status(400)
          .json({ error: 'No hay routinas para ese usuario' })
          .end();
      }
    }
  );
});
module.exports = router;
