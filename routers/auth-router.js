var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/auth-controller');

// Sign In route
router.post('/signin', authCtrl.signIn);

module.exports = router;

