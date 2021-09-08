const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
  const rolExistente = await Rol.findOne({rol});
  if (!rolExistente) {
    throw new Error(`El rol ${rol} no es un rol válido`);
  }
}

const existeEmail = async (correo) => {
  const usuarioExistente = await Usuario.findOne({correo});
  if (usuarioExistente) {
    throw new Error(`El correo indicado ya está en uso`);
  }
}

module.exports = {
  esRolValido,
  existeEmail
}
