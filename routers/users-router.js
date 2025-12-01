var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/user-controller');
var auth = require('../middleware/auth-middleware');

// Public routes (no authentication required)
router.get('/', ctrl.list);
router.post('/', ctrl.create); // Sign up - no auth required
router.get('/:id', ctrl.getById);

// Protected routes (authentication required for edit and delete)
router.put('/:id', auth.authenticate, ctrl.update);
router.delete('/:id', auth.authenticate, ctrl.remove);
router.delete('/', auth.authenticate, ctrl.removeAll);

module.exports = router;
