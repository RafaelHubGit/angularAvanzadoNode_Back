const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        // Esta la conexion que se saca de la pag de mongoose
        // mongodb+srv://mean_user:BpR4LLtN38utO4Nz@cluster0.cwx9q.mongodb.net/hospitaldb Se saca de atlas
        await mongoose.connect( process.env.DB_CNN ,{
                        useNewUrlParser: true, 
                        useUnifiedTopology: true,
                        useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD ver logs')
    }

}

// Se exporta para ser usado en el index
module.exports = {
    dbConnection
}