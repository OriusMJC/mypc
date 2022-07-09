import express from "express";
import { body, validationResult } from "express-validator";
import { Router } from "express";
import { getBasicUserInfo } from "../services/usersServices";
import {
	getAllProducts,
	getProductById,
	getProductByName,
	addNewProduct,
	updateDataProduct,
	productSelled,
	addComment,
	deleteProduct,
	deleteComment,
	addSellerResp,
    deleteSellerResp,
} from "../services/productServices";
import * as types from "../types";
import cloudinary from '../services/cloudinarySettings';
const router = Router();

//obtener todos los productos con los detalles minimos
//Verificar si recibe query para la busqueda de productos especificos.
router.get("/", async (req, res, next): Promise<any> => {
	const { name } = req.query;
	try {
		if (!name) {
			let allProducts: types.Products[] = await getAllProducts();
			return res.json(allProducts);
		} else {
			let productsSearch = await getProductByName(name.toString());
			return res.json(productsSearch);
		}
	} catch (err) {
		next(err);
	}
});

//obtener todos los detalles de un producto en especifico
router.get("/:id", async (req, res, next) => {
	const id = req.params.id;
	try {
		let productById = await getProductById(id);
		res.json(productById);
	} catch (error) {
		next(error);
	}
});
//crear un nuevo producto (body) y añadirselo al usuario (params)
router.post('/:idUser', [
    body('photo', 'Ingrese una imagen')
        .exists(),
    body('title', 'Ingrese un titulo')
        .exists()
        .isLength({max:50}),
    body('price', 'Ingrese un valor')
        .exists()
        .isNumeric(),
    body('type', 'Ingrese un tipo') 
        .exists(),
    body('status', 'Ingrese un estado')
        .exists(),       
    body('stockInitial', 'Ingrese una cantidad')
        .exists()
        .isNumeric()
        .isInt(),
    body('description', 'Ingrese una descripcion del producto')
        .exists()
        .isLength({
            min: 5,
            max: 500
        })
],async (req: express.Request, res: express.Response, next:any)=>{//en la documentacion de express-validator res y req estan asi
    const errors = validationResult(req)
    let arr:any= [];
    const photos = req.body.photo
    const newProduct = req.body
    photos.map(async(p:any) => {
        await cloudinary.uploader.upload(p, (error:any, result:any) => {
            if(!error) {
            	arr.push(result.url)
            }
            });
    })
    
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() })
    } else {
    const {idUser} = req.params
    const products = {
        ...newProduct,
        photos: arr,
    }
    
    // let newImg = ""; 
	// await cloudinary.uploader.upload(req.body.photo[0], (error:any, result:any) => {
        
	// 	if(!error) {
	// 		newProduct.photo[0] = [result.url];
	// 	}
	// });
	// newProduct.photo = newImg
    try{ 
        const userData = await getBasicUserInfo(idUser) 
        let response = await addNewProduct(userData, products);
        res.json(response)    
    }
    catch(error){ 
        return next(error)
    }
}})

router.delete("/:idProduct", async (req, res, next) => {
	try {
		const id = req.params.idProduct;
		if (id) {
			let resp = await deleteProduct(id);
			res.json(resp);
		}
	} catch (error) {
		next(error);
	}
});

//Modificar la informacion (body) de un producto (params)

router.put('/:idProduct', [
    body('photo', 'Ingrese una imagen')
        .exists(),
    body('title', 'Ingrese un titulo')
        .exists()
        .isLength({max:50}),
    body('price', 'Ingrese un valor')
        .exists()
        .isNumeric(),
    body('type', 'Ingrese un tipo') 
        .exists(),
    body('status', 'Ingrese un estado')
        .exists(),       
    body('cant', 'Ingrese una cantidad')
        .exists()
        .isNumeric()
        .isInt(),
    body('description', 'Ingrese una descripcion del producto')
        .exists()
        .isLength({
                    min: 5,
                    max: 500
        })
],async (req: express.Request, res: express.Response, next:any)=>{//en la documentacion de express-validator res y req estan asi
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    } else {
    const newDataProduct = req.body
    const id = req.params.idProduct
    try {
        const response = await updateDataProduct(id, newDataProduct)
        res.json(response)
    } catch (error) {
        return next(error)
    }
}})

router.put('/comments/:idProduct', [
    body('comment', 'Ingrese un comentario')
        .exists()
        .isLength({
            min:1,
            max: 500
})
    ],async (req: express.Request, res: express.Response, next:any)=>{//en la documentacion de express-validator res y req estan asi
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        } else {
    const id = req.params.idProduct
    const newComment = req.body
    try {
        const response = await addComment(id,newComment)
        res.json(response)
    } catch (error) {
        return next(error)
    }
}})


router.delete(
	"/comments/delete/:idProduct/:idComment",
	async (req, res, next) => {
		const { idProduct, idComment } = req.params;
		try {
			const resp = await deleteComment(idProduct, idComment);
			res.json(resp);
		} catch (error) {
			next(error);
		}
	}
);


router.put('/comments/update/:idProduct', [
    body('response', 'Ingrese un comentario')
        .exists()
        .isLength({
            min:1,
            max: 500
})
    ],async (req: express.Request, res: express.Response, next:any)=>{//en la documentacion de express-validator res y req estan asi
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        } else {
    const id = req.params.idProduct
    const resp = req.body
    try {
        const response = await addSellerResp(id, resp)
        res.json(response)
    } catch (error) {
        return next(error)
    }
}})

router.put('/comments/delete/:idProduct', async(req, res, next) => {
    const id = req.params.idProduct
    const resp = req.body
    try {
        const response = await deleteSellerResp(id, resp)
        res.json(response)
    }catch (error) {
        next(error)
    }
})

router.put('/selled/:idProduct',async(req,res,next)=>{
    const {idProduct} = req.params
    const {cant} = req.query
    try {
        const response = await productSelled(idProduct,Number(cant))
        res.json(response)
    } catch (error) {
        next(error)
    }
})


module.exports = router;
