const conexion = require('../bbdd/conexion')
const router = require ('express').Router()
const rutaMemorando = require ('express').Router()


//get productos
router.get('/',(req,res)=>{
    let sql='SELECT * FROM tpicaro.detallememorandos;'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        
        else{
            console.log(rows[0])
            res.json(rows)
        }
    })
});

module.exports = router