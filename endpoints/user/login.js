
const { User } = require('../../models/user')
const login = () => ({
    post: (req, res) => {
        console.log(req);
        miUsuario = new User(req.body.email, req.body.password);
        if(miUsuario.login()) {
            res.status(201).send('Usuario logeado correctamente');
        }else{
            res.status(500).send('Usuario desconocido');
        }
    }
})

module.exports = login;
