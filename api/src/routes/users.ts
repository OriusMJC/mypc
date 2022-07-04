import express from "express";
// import { body, validationResult } from 'express-validator'
import { body, validationResult } from "express-validator";
import { Router } from "express";
import {
	getAllUsers,
	getUserById,
	addNewUser,
	updateDataUser,
	userBuyProduct,
	userFavProduct,
	userDelFavProduct,
	updateEmailUser,
} from "../services/usersServices";
import * as types from "../types";
import { addOrder, getUserOrders, /*getAllOrders*/ } from "../services/orderServices";
import cloudinary from "../services/cloudinarySettings"
const Stripe = require("stripe")(process.env.SECRET_KEY);
const router = Router();



//obtener a todos los usuarios
router.get("/", async (_req, res, next) => {
	try {
		const users: Array<types.User> = await getAllUsers();
		res.json(users);
	} catch (err) {
		next(err);
	}
});

//obtener al usuario en especifico que se acaba de logear
//Dar un msj de error en caso de no estar registrado.
router.get("/:idUser", async (req, res) => {
	const id = req.params.idUser;
	try {
		const userById = await getUserById(id);
		res.json(userById);
	} catch {
		res.status(404).json({ msg: `User doesn't exist` });
	}
});

//crear nuevo usuario en DB con los datos por body
router.post(
	"/",
	[
		//avatar no era obligatorio porque se ponia uno por defecto?
		body("name", "Ingrese un nombre de usuario").exists().isLength({ max: 20 }),
		body("phone", "Ingrese un numero de telefono")
			.exists()
			.isNumeric()
			.isLength({ max: 13 }),
		body("email", "Ingrese un email").exists().isEmail().isLength({ min: 7 }),
		body("password", "Ingrese una contraseña valida")
			.exists()
			.isAlphanumeric()
			.isLength({ min: 6, max: 12 }),
	],
	async (req: express.Request, res: express.Response, next: any) => {
		//en la documentacion de express-validator res y req estan asi
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		} else {
			try {
				if(req.body.avatar) {
					let newImg = ""; 
					await cloudinary.uploader.upload(req.body.avatar, (error:any, result:any) => {
						if(!error) {
							newImg = result.url;
						}
					});
					req.body.avatar = newImg
				}
				const response = await addNewUser(req.body);
				res.send(response);
			} catch (err) {
				return next(err);
			}
		}
	}
);

//modificar info (body) de usuario (params)
router.put(
	"/:idUser",
	[
		body("name", "Ingrese un nombre de usuario").exists().isLength({ max: 20 }),
		body("phone", "Ingrese un numero de telefono")
			.exists()
			.isNumeric()
			.isLength({ max: 13 }),
		body("email", "Ingrese un email").exists().isEmail().isLength({ min: 7 }),
		body("password", "Ingrese una contraseña valida")
			.exists()
			.isAlphanumeric()
			.isLength({ min: 6, max: 12 }),
	],
	async (req: express.Request, res: express.Response, next: any) => {
		//en la documentacion de express-validator res y req estan asi
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		} else {
			const newDataUser = req.body;
			try {
				let response = await updateDataUser(newDataUser);
				res.json(response);
			} catch (err) {
				return next(err);
			}
		}
	}
);

router.put("/fav/:idUser", async (req, res, next) => {
	try {
		const { idUser } = req.params;
		const productData = req.body;
		const response = await userFavProduct(idUser, productData);
		res.json(response);
	} catch (error) {
		next(error);
	}
});
router.delete("/fav/:idUser/:idProduct", async (req, res, next) => {
	try {
		const { idUser, idProduct } = req.params;
		const response = await userDelFavProduct(idUser, idProduct);
		res.json(response);
	} catch (error) {
		next(error);
	}
});
router.put("/buy/:idUser", async (req, res, next) => {
	try {
		const { idUser } = req.params;
		const productData = req.body;
		const response = await userBuyProduct(idUser, productData);
		res.json(response);
	} catch (error) {
		next(error);
	}
});
router.put(
	"/:id/email",
	[
		body("newMail", "Ingrese un nuevo email")
			.exists()
			.isEmail()
			.isLength({ min: 7 }),
	],
	async (req: express.Request, res: express.Response, next: any) => {
		//en la documentacion de express-validator res y req estan asi
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		} else {
			let { id } = req.params;
			let { email } = req.body;
			try {
				const user = await updateEmailUser(id, email);
				res.send(user);
			} catch (error) {
				return next(error);
			}
		}
	}
);
router.post("/payments", async (req, res) => {
	let { amount, token, purchaseData } = req.body;
	try {
		await Stripe.charges.create({
			source: token.id,
			amount,
			currency: "usd",
		});
		await addOrder(amount, token, purchaseData);
		res.send(true);
	} catch (error) {
		res.send(false);
	}
});
router.post("/orders/:id", async (req, res) => {
	let { id } = req.params;
	const orders = await getUserOrders(id);
	res.send(orders);	
});
router.post("/test", async (_req, _res) => {
	// =========================
	// PRUEBA PARA GUARDAR IMG
	// =========================
	// let {img} = _req.body
	// let resp = await cloudinary.uploader.upload(img, (error:any, result:any) => {
	// 	console.log(result, error)
	// 	return result
	// });
	// res.send(resp)
	// =========================


	// =========================
	// PRUEBA PARA TRAER TODAS LAS ORDENES 
	// =========================
	// let test = await getAllOrders();
	// res.send(test)
	// =========================

})
/* 
router.get('/:idUser/orders', getUserOrders)

router.get('/:idUser/orders/:idOrder', getUserOrder)

router.get('/:idUser/cart/payment')
*/

module.exports = router;
