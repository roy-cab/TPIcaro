const conexion = require('../bbdd/conexion')
const router = require('express').Router()



//get usuarios
router.get('', (req, res) => {
    let sql = 'select IdUsuario, NombreUsuario from usuarios'
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;

        else {
            console.log(rows[0])
            res.json(rows)
        }
    })
});

//post usuarios
router.post('/nuevoUsuario', (req, res) => {
    console.log("datos nuevo usuario = " + JSON.stringify(req.body))
    let sql = 'INSERT INTO usuarios (NombreUsuario, PassUsuario, IdCiudad, IdPais) VALUES ("' +
        req.body.usuario + '","' + req.body.pass + '","' + req.body.ciudad + '","' + req.body.pais + '")'
    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            console.log("error al realizar el insert " + sql)
        } else {
            console.log("usuario creado correctamente.")
            res.status(200).send("OK");
        }
    })
});


//post usuarios
router.post('/getId', (req, res) => {
    console.log(req.body)
    console.log("Solicita id del usuario = " + JSON.stringify(req.body))
    let sql = 'Select IdUsuario from usuarios where NombreUsuario = "' + req.body.usuario + '"'
    conexion.query(sql, (err, rows, fields) => {
        try {
            if (err) {
                // console.log("error al realizar el get: " + sql)
                // res.status(400).send("Error");
                throw new error ("Aca pasó un error: ", err);
            } else {
                console.log("Id obtenido correctamente: " + rows[0].IdUsuario.toString())
                res.status(200).send(rows[0].IdUsuario.toString());
            }

        } catch (e) {
            console.log("Error al realizar el get: " + sql)
            console.log("Mensaje de error: " + e.message)
            res.status(400).send("Usuario inexistente.");
        }

    })
});


module.exports = router;