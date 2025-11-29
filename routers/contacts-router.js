var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/control-controller');

router.get('/',    ctrl.list);
router.post('/',   ctrl.create);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.delete('/', ctrl.removeAll);

module.exports = router;
