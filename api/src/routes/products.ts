import { Router } from 'express';
import { getBasicUserInfo} from '../services/usersServices';
import { getAllProducts,getProductById,getProductByName, addNewProduct, updateDataProduct, productSelled, addComment, deleteProduct } from '../services/productServices';
import * as types from '../types'
const router = Router();


//obtener todos los productos con los detalles minimos
//Verificar si recibe query para la busqueda de productos especificos.
router.get('/',async (req,res,next):Promise<any> =>{
    const {name} = req.query;
    try{
        if(!name){
            let allProducts: types.Products[] = await getAllProducts();
            return res.json(allProducts)
        }
        else{
            let productsSearch = await getProductByName(name.toString())
            return res.json(productsSearch)
        }
    }
    catch(err){
        next(err)
    }
})

//obtener todos los detalles de un producto en especifico
router.get('/:id',async (req,res,next)=>{
    const id = req.params.id
    try{
        let productById = await getProductById(id)
        res.json(productById)
    }
    catch(error){
        next(error)
    }

})

//crear un nuevo producto (body) y añadirselo al usuario (params)
router.post('/:idUser',async (req,res,next)=>{
    const {idUser} = req.params
    const newProduct = req.body 
    try{ 
        const userData = await getBasicUserInfo(idUser)    
        let response = await addNewProduct(userData, newProduct);
        res.json(response)    
    }
    catch(error){ 
        next(error)
    }
})

router.delete('/:idProduct', async(req, res, next) => {
    try {
        const id = req.params.idProduct;
        if(id){
            let resp = await deleteProduct(id);
            res.json(resp);
        }
    } catch (error) {
        next(error)
    }
})

//Modificar la informacion (body) de un producto (params)
router.put('/:idProduct',async(req,res,next)=>{
    const newDataProduct = req.body
    const id = req.params.idProduct
    try {
        const response = await updateDataProduct(id, newDataProduct)
        res.json(response)
    } catch (error) {
        next(error)
    }
})
router.put('/comments/:idProduct',async(req,res,next)=>{
    const id = req.params.idProduct
    const newComment = req.body
    try {
        const response = await addComment(id,newComment)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put('/selled/:idProduct',async(req,res,next)=>{
    const {idProduct} = req.params
    try {
        const response = await productSelled(idProduct)
        res.json(response)
    } catch (error) {
        next(error)
    }
})


module.exports = router;