const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
  const rolExistente = await Rol.findOne({rol});
  if (!rolExistente) {
    throw new Error(`El rol ${rol} no es un rol válido`);
  }
}

const existeEmail = async (correo, usuarioId=null) => {
  if (usuarioId) {
    const usuario = await Usuario.findById(usuarioId);
    if (usuario.correo != correo) {
      const usuarioExistente = await Usuario.findOne({correo});
      if (usuarioExistente) {
        throw new Error(`El correo indicado ya está en uso`);
      }
    }
  } else {
    const usuarioExistente = await Usuario.findOne({correo});
    if (usuarioExistente) {
      throw new Error(`El correo indicado ya está en uso`);
    }
  }
}

const existeUsuarioPorId = async (id) => {
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    throw new Error('No existe el usuario con el id solicitado');
  }
}

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId
}
