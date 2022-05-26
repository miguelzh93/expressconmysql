const mysql = require('mysql');


function consultarUsuario(connection) {
    return new Promise(function(resolve, reject) {
        let strSql = "SELECT * FROM USUARIOS ";
        connection.query(strSql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });    
}

function consultarUnUsuario(connection, data) {
    return new Promise(function(resolve, reject) {
        let strSql = "SELECT * FROM USUARIOS WHERE ID = ? ";
        let query = mysql.format(strSql, [data.id]);
        console.log("aqui pase");
        connection.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });    
}


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

module.exports = { insertarUsuario , consultarUsuario, consultarUnUsuario};