'use strict'
const userClass = require('../../models/user')
const dbconnect = require('../../services/mysql')
const authService = require('../../services/autorization/index')
const bcrypt = require('bcrypt')

const login = () => ({
    post: async (req, res) => {

        // Create a object error 
        let error = { message: undefined, email: false, password: false }
        const datalogin = { email: req.body.email, password: req.body.password }

        console.log(datalogin)
        //Validate data recived
        if(!req.body.password) error.password = true
        if(!req.body.email) error.email = true
        if(error.email||error.password) {
            error.message = 'User or password are invalid, review your data'
            res.status(401).send(error)
        } else {

            //If no errors, search data input in database
            await dbconnect.query('select * from user where email="' + req.body.email + '"').then((usuario) => 
                {
                    if(!usuario[0]) { 
                        error.message = 'User or password invalid!'
                        res.status(401).send(error)
                    }else{
                        if(bcrypt.compareSync(req.body.password, usuario[0].password)) {
                            const userlogin = usuario[0]
                            const userToken = authService.createToken(userlogin)
                            res.status(200).send(userToken)
                        } else{
                            error.message = 'User or password invalid!'
                            res.status(401).send(error)
                        }
                    }
                }, error => {
                    error.message = 'Error validating user, please retry later'
                    res.status(401).send(error)
            })
        }
    }
})

module.exports = login;