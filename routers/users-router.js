var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/user-controller');

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.delete('/', ctrl.removeAll);  
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
