'use strict';
var express = require('express')
var router = express.Router()
const { user, login } = require('../endpoints')
const axios = require('axios')

const userHandlers = user({axios})
const loginHandlers = login()
// GET: /
router.get('/', function(req, res) {
  res.render('index/index', {
    title: 'Index page loaded!'
  });
});

router.get('/users', function(req, res) {
  res.render('index/index', {
    title: 'Bienvenido a la página de usuarios'
  });
});

router.get('/usuarios', userHandlers.get);
router.post('/usuarios', userHandlers.post);
router.post('/usuario/login', loginHandlers.post);
router.put('/usuarios/:id', userHandlers.put);
router.delete('/usuarios/:id', userHandlers.delete);
module.exports = router;
