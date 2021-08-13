const conexion = require('../bbdd/conexion')
const router = require ('express').Router()



//get ciudades
router.get('/ciudades',(req,res)=>{
    let sql='select * from ciudades'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        
        else{
            console.log(rows[0])
            res.json(rows)
        }
    })
});

//get paises
router.get('/paises',(req,res)=>{
    let sql='select * from paises'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        
        else{
            console.log(rows[0])
            res.json(rows)
        }
    })
});



module.exports = router;