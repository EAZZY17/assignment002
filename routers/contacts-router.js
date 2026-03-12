var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/control-controller');
var auth = require('../middleware/auth-middleware');

// Public routes (no authentication required)
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create); // Contact form - visitors can submit without auth

// Protected routes (authentication required)
router.put('/:id', auth.authenticate, ctrl.update);
router.delete('/:id', auth.authenticate, ctrl.remove);
router.delete('/', auth.authenticate, ctrl.removeAll);

module.exports = router;
