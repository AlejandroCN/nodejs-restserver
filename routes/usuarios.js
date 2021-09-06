const { Router } = require('express');
const { findAll, save, update, del } = require('../controllers/usuarios');

const router = Router();

router.get('/', findAll);
router.post('/', save);
router.put('/:id', update);
router.delete('/', del);

module.exports = router;