const jwt = require("jsonwebtoken");

const validarJWT = ( req, res, next ) => {

    //Leer Token 
    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        //req.uid = uid; // haciendo esto req.uid se puede compartir informacion hacia donde esta en middleware, solo se tendria que leer como req.uid

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}