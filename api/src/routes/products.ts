import { Router } from 'express';

const router = Router();


//obtener todos los productos con los detalles minimos
//Verificar si recibe query para la busqueda de productos especificos.
router.get('/',(_req,res)=>{
    res.send('Products')
})

//obtener todos los detalles de un producto en especifico
router.get('/:id',(req,res)=>{
    const id = req.params.id
    res.send('Product ' + id)
})

//crear un nuevo producto (body) y añadirselo al usuario (params)
router.post('/:idUser',(req,res)=>{
    const newProduct = req.body
    res.send('Product posted' + newProduct)
})

//Modificar la informacion (body) de un producto (params)
router.put('/:idProduct',(req,res)=>{
    const updateProduct = req.body
    res.send('Product update' + updateProduct)
})


module.exports = router;