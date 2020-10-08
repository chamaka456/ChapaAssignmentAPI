
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b278c1fc72d411',
    password: '610a2736',
    database: 'heroku_6b6f34f15decd64'
  });


  module.exports = connection;