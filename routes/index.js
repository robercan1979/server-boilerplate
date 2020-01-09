'use strict';
var express = require('express')
var router = express.Router()
const { user, login, imagen } = require('../endpoints')
const axios = require('axios')
const auth = require('../middlewares/auth')

const loginHandler = login()
const userHandler = user({axios})
const imgHandler = imagen({axios})
// GET: /
router.get('/', function(req, res) {
  res.render('index/index', {
    title: 'Index page loaded!'
  });
});

router.post('/api/login', loginHandler.post);

router.get('/api/image/:id', imgHandler.get);
router.post('/api/image', imgHandler.post);
router.put('/api/image', imgHandler.put);
router.delete('/api/image', imgHandler.delete);

router.get('/api/users', auth, userHandler.get);
router.post('/api/user', userHandler.post);
router.put('/api/user/:id', userHandler.put);
router.delete('/api/user/:id', userHandler.delete);

module.exports = router;
