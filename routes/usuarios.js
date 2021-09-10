const { Router } = require('express');
const { check } = require('express-validator')

const { findAll, save, update, del } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', findAll);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'Ingrese al menos 6 letras').isLength(6),
  check('correo', 'El correo no es válido').isEmail().custom((correo) => existeEmail(correo)),
  check('rol').custom(esRolValido),
  validarCampos
], save);

// colocar el id como parte de la ruta lo convierte obligatorio para acceder al controlador
router.put('/:id', [
  check('id', 'El id no es válido').isMongoId().custom(existeUsuarioPorId),
  check('rol').custom(esRolValido),
  check(
    'correo', 'El correo no es válido'
  ).isEmail().custom((correo, {req}) => existeEmail(correo, req.params.id)),
  validarCampos
], update);

router.delete('/', del);

module.exports = router;