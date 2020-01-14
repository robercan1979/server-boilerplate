'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const { decodeToken, createToken } = require('../services/autorization')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        res.status(403).send({ message: 'No tienes autorización' })
    } else {
        const authorization = req.headers.authorization.split(" ")
        decodeToken(authorization[1])
        .then(response => {
            req.user = response
            next()
        })
        .catch(error =>{
            res.status(error.status).send({message: error.message})
        })
    }
}

module.exports = isAuth