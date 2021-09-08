const { Router } = require('express');
const { check } = require('express-validator')

const { findAll, save, update, del } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail } = require('../helpers/db-validators');

const router = Router();

router.get('/', findAll);
router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'Ingrese al menos 6 letras').isLength(6),
  check('correo', 'El correo no es válido').isEmail().custom(existeEmail),
  check('rol').custom(esRolValido),
  validarCampos
], save);
router.put('/:id', update);
router.delete('/', del);

module.exports = router;