const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3000; // Puerto para express.js
const mysql = require('mysql');

app.use(express.json());
require("dotenv").config();

const { insertarUsuario, consultarUsuario, consultarUnUsuario } = require("./operacionesdb");

const connnection  =mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
});

//Conexión a la base de datos
connnection.connect((err)=>{
    if(err) throw err;
    console.log("Conectado a la base de datos")
});

//Levantar el server de express
app.listen(port, () => {
    console.log('listening on port ' + port);
});


//Ruta principal del proyecto
app.get('/', (req, res) => {
    res.send('Hola server express');
});

//Get simple todos los usuarios
app.get('/v1/usuarios', (req, res) => {
    consultarUsuario(connnection)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//Get un usuario por id
app.get('/v1/usuarios/:id', (req, res) => {
    let data = req.params;
    consultarUnUsuario(connnection, data)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

//Insertar un usuario
app.post('/v1/usuario', (req, res) => {
    const body = req.body;    
    insertarUsuario(connnection, body)
    .then( (result) => {
        console.log('insertado');
        res.status(200).json({regAfectados: result.affectedRows});
    })
    .catch((err) => {
        console.error('Se murio');
        res.status(400).json(err);
    });
   
});


