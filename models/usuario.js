//const mongoose = require('mongoose'); es lo mismo, solo se deberia poner mongoose.Schema o mongoose.model
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

// Sirve para poder modificar como va a traer la informacion, en este caso se cambia _id por uid y se quita __v y password
UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;

    return object
});

// Por defecto mongoose agrega una S, en este caso Usuarios en lugar de Usuario
module.exports = model( 'Usuario', UsuarioSchema );