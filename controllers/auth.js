const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');


const login = async ( req, res = response ) => {

    const { email, password } = req.body

    try {

        // Verifica email
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario y contraseña no validos'
            });
        }

        // Verifica contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y contraseña no validos.'
            });
        }

        // Generar el TOKEN 
        const token = await generarJWT( usuarioDB.id );

        res.status(200).json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin.'
        });
    }

}

module.exports = {
    login
} 