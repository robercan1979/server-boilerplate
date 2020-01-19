const mariadb = require('mariasql')
const { mariadbConfig }  = require('../../config/database')
const { promisify } = require('util')

var c = new mariadb({
    host: '127.0.0.1',
    user: 'root',
    password: 'AF2016seg*',
    db: 'usertest'
  });
console.log('Database connection ready')
 /* c.query('SELECT * FROM user;', null, { metadata: true }, function(err, rows) {
    if (err)
      throw err;
    // `rows.info.metadata` contains the metadata
    console.log(rows);
  });
  
  c.end();
*/
module.exports = c