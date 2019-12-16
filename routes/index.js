'use strict';
var express = require('express');
var router = express.Router();

// GET: /
router.get('/', function(req, res) {
  res.render('index/index', {
    title: 'Hello, World!'
  });
});

router.get('/users', function(req, res) {
  res.render('index/index', {
    title: 'Bienvenido a la página de usuarios'
  });
});

module.exports = router;
