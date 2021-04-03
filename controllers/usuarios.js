
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado.'
            });
        }

        const usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar Usuario
        await usuario.save();

        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado, revisar logs.'
        });
    }

}

const actualizarUsuario = async( req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        // Actualizaciones 
        // Haciendo esto se estan omitiendo password y google de "campos"
        const { password, google, email, ...campos} = req.body;

        if ( usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await usuario.findByIdAndUpdate( uid, campos, { new: true } ); // el new: true, es para que regrese el actualizado, si no se pone, regresa como estaba en base de datos

        console.log(usuarioActualizado);

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const borrarUsuario = async( req, res = response ) => {

    const uid = req.params.id

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        await usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario Eliminado.'
        })

        
    } catch (error) {
        console.log(error);
        res.status( 500 ).json({
            ok: false,
            msg: 'Error inexperado.'
        });
        
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}