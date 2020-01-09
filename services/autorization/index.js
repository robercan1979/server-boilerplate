'use strict'
const moment = require('moment')
const jwt = require('jwt-simple')
const config = require('../../config/key')

function createToken(user){
    const payload = {
        sub: user.iduser,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.secretKey)
}
function decodeToken(token){
    return new Promise ((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.secretKey)

            if(payload.exp <= moment().unix()) reject({ status: 403, message: 'El token haq expirado' })
            resolve(payload.sub)
        }
        catch(error){
            reject({status: 500, message: 'Invalid token' })
        }
        
    })
}
module.exports = { createToken, decodeToken }