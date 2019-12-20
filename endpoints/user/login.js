
const userClass = require('../../models/user')
const conn = require('../../services/mysql')

const login = () => ({
    post: async (req, res) => {
        console.log(req);
        const usuario = conn.query('select * from user where email="' + req.body.email + '"').then((usuario) => {
            console.log('Password DB = ' + usuario[0].password)
            console.log('Password form = ' + req.body.password)
                if(usuario[0].password === req.body.password) {
                    res.status(201).send('Usuario logeado correctamente')
                } else{
                    res.status(201).send('User or password are invalid!')
                }
                console.log('El usuario es %o', usuario)
            }, error => {
                res.status(500).send('DB Error at login')
        })
    }
})

module.exports = login;
