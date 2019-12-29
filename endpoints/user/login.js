
const userClass = require('../../models/user')
const dbconnect = require('../../services/mysql')
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
        } else {

            //If no errors, search data input in database
            const usuario = await dbconnect.query('select * from user where email="' + req.body.email + '"').then((usuario) => {
                console.log('Password DB = ' + usuario[0].password)
                console.log('Password form = ' + req.body.password)
                    if(usuario[0].password === req.body.password) {
                        const userlogin = usuario[0]
                        res.status(200).send(userlogin)
                    } else{
                        error.message = 'User or password are invalid!'
                    }
                }, error => {
                    error.message = 'Error validating user, please retry later'
            })
        }
        res.status(401).send(error)
    }
})

module.exports = login;
