const dbconnection = require('../../services/mariadb')
const bcrypt = require('bcrypt')

const user = ({ axios }) => ({
    get: async (req, res) => {
        const {body} = req
        const params = req.params
        const id = params.id

        dbconnection.query(`SELECT * FROM user WHERE md5(concat(name, email)) = '${id}';`, null, { metadata: true }, function(err, data) {
            if (err) throw err; 

            if (data.length === 0) { 
                res.status(201).send('No hay registros') 
            }   else    {
                res.status(201).send(data)
            }
        });
    },
    gets: async (req, res) => {
        const {body} = req
        const params = req.params
        
        dbconnection.query('SELECT * FROM user;', null, { metadata: true }, function(err, data) {
            if (err) throw err;
            res.status(201).send(data)
          });
    },
    post: async (req, res) => {
        const {body} = req 
        console.log(body)
        let resultado = {status: 0, sendObject: {}}
        let validationError = false
        let password = bcrypt.hashSync(body.password, 8)
        await dbconnection.query(`select iduser from user where email = '${body.email}';`, null, {metadata: true }, function(error, data) {
            if(error) { resultado = {status: 500, sendObject: error }; validationError = true; }
            
            if(data.length > 0) { 
                resultado = {status: 500, sendObject: {message: 'Usuario duplicado'} };
                validationError = true; 
            }
        })
        if(!validationError) {
            await dbconnection.query(`INSERT INTO user(iduser, email,name,lastname,date_registration,password)VALUES (null, '${body.email}', '${body.name}', '${body.lastname}', now(), '${password}')`, null, {metadata: true }, function(error, data) {
                if(error) { 
                    resultado = { status: 500, sendObject: { err: error, message: 'Error en el insert' } }  
                }else{
                    resultado = { status: 201, sendObject: data }
                }
                res.status(resultado.status).send(resultado.sendObject)
            })
        }else{
            res.status(resultado.status).send(resultado.sendObject)
        }
                

        // console.log('Data: %o', body)
    },
    put: async(req, res) => {
        const {body} = req
        const params = req.params
        const id = params.id

        let sqlpass=''

        if(body.password){
            let password = bcrypt.hashSync(body.password, 10)
            sqlpass = `, password = '${password}'`
        }

        await dbconnection.query(`UPDATE user SET email = '${body.email}', name = '${body.name}', lastname = '${body.lastname}' ${sqlpass} WHERE iduser = '${id}'`).then(
            data => { 
                if(ok.affectedRows === 0){
                    res.status(400).send("No changes found")
                } else {
                    res.status(201).send(ok)
                }
            }, 
            error => {
                res.status(500).send(error)
            }
        )
    },
    delete: async(req, res) => {
        const {body} = req
        const params = req.params
        const id = params.id

        await dbconnection.query(`UPDATE user SET email = CONCAT('Delete-', email), deleted='1' WHERE iduser = '${id}'`).then(
            data => { 
                if(ok.affectedRows === 0){
                    res.status(400).send("No registry deleted")
                }else{
                    res.status(201).send(data)
                }
            }, 
            error =>{
                res.status(500).send(error)
            }
        )
    }
})

module.exports = user