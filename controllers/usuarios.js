const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const findAll = (req, res) => {
  // optional query params with default values
  const { edad = 0, nombre='' } = req.query;

  res.json({
    mensaje: 'Petición GET procesada',
    edad,
    nombre
  });
}

const save = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);
  await usuario.save();

  res.json({
    mensaje: 'Usuario creado correctamente',
    usuario
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