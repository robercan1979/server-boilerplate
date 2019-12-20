const database = require('mysql')
const dbconfig = {
    host: 'localhost',
    user: 'root',
    password: 'AF2016seg*',
    database: 'usertest'
}
const { promisify } = require('util')
const connection = database.createPool(dbconfig)
connection.getConnection((error, connection) => {
    if(error){
        if (error.code === 'PROTOCOL_CONNECTION_LOST') console.error('DATABASE CONNECTION CLOSED')
        if (error.code === 'ER_CON_COUNT_ERROR') console.error('DATABASE HAS TO MANY CONNECTIONS')
    }
    if(connection) connection.release()
    console.log('DB Conected!')
    return
})

//Promisify pool queryes
connection.query = promisify(connection.query)

module.exports = connection