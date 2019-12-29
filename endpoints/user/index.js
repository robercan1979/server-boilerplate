const dbconnection = require('../../services/mysql')
const bcrypt = require('bcrypt')

const user = ({ axios }) => ({
    get: async (req, res) => {
        const {body} = req
        const params = req.params

        await dbconnection.query(`SELECT * FROM user`).then(
            data=>{ 
                res.status(201).send(data)
            }, 
            error =>{
                res.status(500).send(error)
            }
        )
    },
    post: async (req, res) => {
        const {body} = req

        let password = bcrypt.hashSync(body.password, 10)

        await dbconnection.query(`INSERT INTO user(iduser, email,name,lastname,date_registration,password)VALUES (null, '${body.email}', '${body.name}', '${body.lastname}', now(), '${password}')`).then(
            data=>{ 
                res.status(201).send(data)
            }, 
            error =>{
                res.status(500).send(error)
            }
        )

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