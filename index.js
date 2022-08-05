const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();


//console.log(process.env);


//Crear servidor/aplicacion de express
const app = express();

//Conexión a la base de datos
dbConnection();

//Directorio Publico
app.use(express.static('./public'))

//CORS
app.use(cors())

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));

//Manejar otras rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

//GET
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Ruta principal conectada exitosamente',
        uid: 1234
    })
    
})
 

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})