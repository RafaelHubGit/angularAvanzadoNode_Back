const { response } = require('express');
const { validationResult } = require('express-validator'); // Para validar los middleware 

// El next funciona para dar el "sigue con el proceso"
const validarCampos = ( req, res = response, next ) => {


    const errores = validationResult( req );
    if ( !errores.isEmpty() ){
        return res.status(400).json({
            ok: false, 
            errors: errores.mapped()
        });
    }

    next(); // Si todo sale bien, llega a este para seguir con el flujo.

}

module.exports = {
    validarCampos
}