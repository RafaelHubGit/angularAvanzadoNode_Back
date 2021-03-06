// Leer propias variables de entorno, esta en el archivo .env 
require('dotenv').config(); // Busca un archivo con extension .env y lo establece en las variables de entorno de node 
// NOTA! Para leer las variables de entorno es con lo siguiente 
// process.env.variable ejemplo: process.env.PORT <= lee el puerto que establecimos en el archivo .env

// Para importar el express
const express = require( 'express' );

const cors = require('cors')

// Se importa el archivo de configuracion
const { dbConnection } = require('./database/config')

//Crea servidor de express 
const app = express();

// configurar CORS
app.use(cors());

// Lectura y parseo del body 
// Nota: esto siempre va antes de las rutas si no dsria un problema
app.use( express.json() );

// Base de datos 
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/login', require('./routes/auth') );

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en el puerto : ', process.env.PORT);
});