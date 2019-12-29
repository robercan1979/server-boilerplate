'use strict';
var express = require('express')
var router = express.Router()
const { user, login, imagen } = require('../endpoints')
const axios = require('axios')

const loginHandler = login()
const userHandler = user({axios})
const imgHandler = imagen({axios})
// GET: /
router.get('/', function(req, res) {
  res.render('index/index', {
    title: 'Index page loaded!'
  });
});

router.post('/user/login', loginHandler.post);

router.get('image/:id', imgHandler.get);
router.post('image', imgHandler.post);
router.put('image', imgHandler.put);
router.delete('image', imgHandler.delete);

router.get('/users', userHandler.get);
router.post('/users', userHandler.post);
router.put('/users/:id', userHandler.put);
router.delete('/users/:id', userHandler.delete);

module.exports = router;
