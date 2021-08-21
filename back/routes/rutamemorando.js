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

//get ultimoDetalle
router.get('/ultimodetalle',(req,res)=>{
    let sql='SELECT IdDetalle FROM tpicaro.detallememorandos order by IdDetalle desc limit 1;'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        
        else{
            // console.log(rows[0])
            res.status(200).send(rows[0].IdDetalle.toString());
        }
    })
});

//post memorandos
router.post('/getMemorandos',(req,res)=>{
    console.log("Id usuario logueado para consultar memorandos: "+req.body.IdUsuario )
    let sql='select dm.IdDetalle IdMemorando, dest.NombreUsuario Destinatario, remi.NombreUsuario Remitente, \
    dm.Mensaje, date(dm.FechaEnvio) FechaEnvio, "Enviado" Tipo \
    from detallememorandos dm \
    left join usuarios dest on dest.IdUsuario = dm.UsuarioDestinatario \
    left join usuarios remi on remi.IdUsuario = dm.UsuarioRemitente \
    where dm.UsuarioRemitente = ' + req.body.IdUsuario +
    
    ' union \
    \
    select dm.IdDetalle IdMemorando, dest.NombreUsuario Destinatario, remi.NombreUsuario Remitente,  \
    dm.Mensaje, date(dm.FechaEnvio) FechaEnvio, "Recibido" Tipo \
    from detallememorandos dm  \
    left join usuarios dest on dest.IdUsuario = dm.UsuarioDestinatario \
    left join usuarios remi on remi.IdUsuario = dm.UsuarioRemitente \
    where dm.UsuarioDestinatario = '+ req.body.IdUsuario
    
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
    let sql = 'insert into DetalleMemorandos(IdDetalle, UsuarioRemitente, UsuarioDestinatario,Mensaje,FechaEnvio) values(' + req.body._detalle + ',' + req.body._remitente + ',' + req.body._destinatario + ',"' + req.body._mensaje + '", now())'
    console.log(sql)
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            console.log("mensaje enviado")
            res.status(200).send("OK");
        }
    })
});

module.exports = router