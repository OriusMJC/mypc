import { Router } from 'express';

const router = Router();


//obtener a todos los usuarios
router.get('/',(_req,res)=>{
    res.send('users')
})

//obtener al usuario en especifico que se acaba de logear
//Dar un msj de error en caso de no estar registrado.
router.get('/:idUser',(req,res)=>{
    const id = req.params.idUser
    res.send('user ' + id)
})

//crear nuevo usuario en DB con los datos por body
router.post('/',(_req,res)=>{
    res.send('User posted')
})

//modificar info (body) de usuario (params)
router.put('/:idUser',(req,res)=>{
    const id = req.params.idUser
    // const newDataUser = req.body
    res.send('User update' + id)
})


/* 
router.get('/:idUser/orders', getUserOrders)

router.get('/:idUser/orders/:idOrder', getUserOrder)
*/




module.exports = router;