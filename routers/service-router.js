var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/service-controller');
var auth = require('../middleware/auth-middleware');

// Public routes (no authentication required)
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

// Protected routes (authentication required)
router.post('/', auth.authenticate, ctrl.create);
router.put('/:id', auth.authenticate, ctrl.update);
router.delete('/:id', auth.authenticate, ctrl.remove);
router.delete('/', auth.authenticate, ctrl.removeAll);

module.exports = router;
