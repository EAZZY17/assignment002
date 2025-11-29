var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/service-controller');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.delete('/', ctrl.removeAll);

module.exports = router;
