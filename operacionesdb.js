const mysql = require('mysql');

function insertarUsuario(connection, data) {
    return new Promise(function(resolve, reject) {
        let strSql = "INSERT INTO USUARIOS (nombre, nacionalidad) VALUES (?, ?)"
        let query = mysql.format(strSql, [data.nombre, data.nacionalidad]);
        connection.query(query, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
    
}

module.exports = { insertarUsuario };