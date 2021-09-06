const findAll = (req, res) => {
  // optional query params with default values
  const { edad = 0, nombre='' } = req.query;

  res.json({
    mensaje: 'Petición GET procesada',
    edad,
    nombre
  });
}

const save = (req, res) => {
  const body = req.body;
  res.json({
    mensaje: 'Petición POST procesada',
    body
  });
}

const update = (req, res) => {
  // parametros en la ruta
  const id = req.params.id;

  res.json({
    mensaje: 'Petición UPDATE procesada',
    id
  });
}

const del = (req, res) => {
  res.json({
    mensaje: 'Petición DELETE procesada'
  });
}

module.exports = {
  findAll,
  save,
  update,
  del
}