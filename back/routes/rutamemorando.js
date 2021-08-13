const conexion = require('../bbdd/conexion')
const router = require ('express').Router()
const rutaMemorando = require ('express').Router()


//get memorandos
router.get('/',(req,res)=>{
    let sql='SELECT * FROM tpicaro.detallememorandos;'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        
        else{
            // console.log(rows[0])
            res.json(rows)
        }
    })
});

// enviar mensaje
router.post('/',(req,res)=>{
    const {_detalle,_remitente,_destinatario,_mensaje } = req.body

    let sql = `insert into DetalleMemorandos(IdDetalle, UsuarioRemitente, UsuarioDestinatario,Mensaje,FechaEnvio) values('${_detalle}','${_remitente}','${_destinatario}','${_mensaje}', NOW())`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'mensaje enviado'})
        }
    })
});

module.exports = router