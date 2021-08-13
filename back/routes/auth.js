const express = require('express');
const router = express.Router();
const passport = require('passport');
const conexion = require('../bbdd/conexion');

// funcion middleware de autenticacion
const auth = () => {
    return (req, res, next) => {
        console.log("recibo del front: "+JSON.stringify(req.body));
        passport.authenticate('local', (error, user, info) => {
            if(error) res.status(400).json({"statusCode" : 400 ,"message" : error});
            req.login(user, function(error) {
                if (error) return next(error);
                next();
            });
        })(req, res, next);
    }
}

// esta ruta utiliza el middleware auth() para autenticar. Si autentica continua, sino no.
router.post('', auth() , (req, res) => {
    res.status(200).json({"statusCode" : 200 ,"user" : req.user});
});


router.post('/nuevoUsuario', auth(), )

module.exports = router;