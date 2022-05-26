const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3000; // Puerto para express.js
const jsonPrueba = 
    [{
        id : 1,
        name: 'Productos',
        precio: 10000
     },
     {
        id : 2,
        name: 'Productos 2',
        precio: 20000
     }
    ];

app.get('/', (req, res) => {
    res.send('Hola server express');
});
//Get simple
app.get('/v1/productos', (req, res) => {
    res.json(jsonPrueba);
});

//Get con params
app.get('/v1/productos/:id', (req, res) => {
    let identity = req.params.id;
    console.log(identity);
    res.json(jsonPrueba);
});


app.listen(port, () => {
    console.log('listening on port ' + port);
});

//console.log('My app');