/* 
    Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/',validarJWT ,getUsuarios );

router.post( '/',[ // aqui van los middleware
                   // Los middleware son funciones que se ejecutan antes de todo para hacer validaciones
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El e-mail es obligatorio').isEmail(),
    validarCampos // Se pone aqui para que primero haga las validaciones de arriba
],crearUsuario );

router.put( '/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El e-mail es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario );

router.delete( '/:id', [
    validarJWT,
    borrarUsuario
]);


module.exports = router;