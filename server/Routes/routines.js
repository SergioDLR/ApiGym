const router = require('express').Router();
const Routine = require('../Schemas/routine');
const jwt = require('jsonwebtoken');
router.post('/', async (req, res) => {
  try {
    const rotineReq = new Routine(req.body.routine);
    const savedRoutine = await rotineReq.save();
    res.status(200).json(savedRoutine).end();
  } catch {
    console.log('ocurrio un error');
    res.status(400).json({ error: 'Faltan parametros en la query' }).end();
  }
});

router.get('/', (req, res) => {
  console.log(req.user);
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
