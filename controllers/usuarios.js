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

  res.status(201).json({
    mensaje: 'Usuario creado correctamente',
    usuario
  });
}

const update = async (req, res) => {
  const id = req.params.id;
  const { _id, password, google, estado, ...usuario } = req.body;

  // solo actualiza los campos que contenga usuario, los ausentes los deja como estan
  const usuarioActualizado = await Usuario.findByIdAndUpdate(id, usuario, {new: true});

  res.status(201).json({
    mensaje: 'Usuario actualizado correctamente',
    usuarioActualizado
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