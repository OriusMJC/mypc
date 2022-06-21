import { Router } from 'express';
import { getAllUsers, getUserById, addNewUser, updateDataUser,userBuyProduct, userFavProduct, userDelFavProduct} from '../services/usersServices';
import * as types from '../types'
const router = Router();


//obtener a todos los usuarios
router.get('/', async (_req,res,next)=>{
    try{
        const users: Array<types.User> = await getAllUsers();
        res.json(users)
      }
      
      catch(err){
          next(err)
      }
})

//obtener al usuario en especifico que se acaba de logear
//Dar un msj de error en caso de no estar registrado.
router.get('/:idUser',async (req,res)=>{
    const id = req.params.idUser
    try{
        const userById = await getUserById(id)
        res.json(userById) 
    }
    catch{ 
        res.status(404).json({msg:`User doesn't exist`})
    }
})

//crear nuevo usuario en DB con los datos por body
router.post('/',async(req,res, next)=>{
    try{ 
        const response =  await addNewUser(req.body) 
        res.send(response)
    }

    catch(err){ 
        next(err)
    }
})

//modificar info (body) de usuario (params)
router.put('/:idUser',async(req,res,next)=>{
    const newDataUser = req.body
    try{
        let response= await updateDataUser(newDataUser)
        res.json(response)
   }
   catch(err){ 
       next(err)
    }
})

router.put('/fav/:idUser',async(req,res,next)=>{
    try {
        const {idUser} = req.params
        const productData = req.body
        const response = await userFavProduct(idUser,productData)
        res.json(response)
    } catch (error) {
        next(error)
    }
})
router.delete('/fav/:idUser/:idProduct',async(req,res,next)=>{
    try {
        const {idUser,idProduct} = req.params
        const response = await userDelFavProduct(idUser,idProduct)
        res.json(response)
    } catch (error) {
        next(error)
    }
})
router.put('/buy/:idUser',async(req,res,next)=>{
    try {
        const {idUser} = req.params
        const productData = req.body
        const response = await userBuyProduct(idUser,productData)
        res.json(response)
    } catch (error) {
        next(error)
    }
})





module.exports = router;