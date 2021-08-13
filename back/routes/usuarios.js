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



module.exports = router;