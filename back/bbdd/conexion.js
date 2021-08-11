const mysql = require ('mysql');

const conexion = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password : 'root',
    port : '3306',
    database : 'tpIcaro',
})

conexion.on('error', function(err) {
    if (err){
    console.log("[mysql error]",err);
    conexion.connect(function(err) {
      if (err) {
        console.error('Error de conexión: ' + err.sqlMessage);
        return;
      }
      console.log('Conexión en ID: ' + conexion.threadId);
    });
  }
  console.log('Conexión en ID: ' + conexion.threadId);
  });
  
  module.exports = conexion;