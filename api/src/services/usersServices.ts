import * as types from '../types'
import { addLikes, deleteLike, deleteUserProducts } from './productServices';
const { User } = require('../db');
const {DB_EMAIL} = process.env;

//Aqui van las funciones para todo sobre los users

export const getAllUsers = async (): Promise<types.User[]> => {
	let allUsers = await User.findAll();
	return allUsers;
};

export const getUserById = async (id: string): Promise<types.User | string> => {
	if (id) {
		let user = User.findByPk(id);
		return user;
	}
	return "No se ha encontrado ningun usuario registrado con esa id: " + id;
};

export const getBasicUserInfo = async (
	id: string
): Promise<types.NonSensitiveUserInfo | string> => {
	let userData = await User.findByPk(id);
	const user = {
		id: userData?.dataValues.id,
		name: userData?.dataValues.name,
		email: userData?.dataValues.email,
		avatar: userData?.dataValues.avatar,
		phone: userData?.dataValues.phone,
		latitude: userData?.dataValues.latitude,
		longitude: userData?.dataValues.longitude,
	};
	return user;
};

export const addNewUser = async(user: types.User): Promise<string> => {
    if(user.email === DB_EMAIL){
        await User.create({...user,admin:true})
    }else{
        await User.create(user)
    }

	return "Usuario guardado con éxito";
};

export const updateDataUser = async (
	newUserData: types.User
): Promise<string> => {
	await User.update(newUserData, { where: { id: newUserData.id } });
	let newUser = await User.findByPk(newUserData.id)
	return newUser;
};
export const updateEmailUser = async (id: any, newEmail:string) => {
	let user = await User.findByPk(id);
	if (typeof user === "object") {
		user.email = newEmail;
		await user.save();
        return user;
	}
	return "error";
};

export const userFavProduct = async (
	idUser: string,
	product: types.basicProductInfo
): Promise<string> => {
	let user = await User.findByPk(idUser);
	let newFavArr: any = [...user.dataValues.fav];
	if (newFavArr.length) {
		if (!newFavArr.find((p: any) => p.id === product.id)) {
			newFavArr.push(product);
			await addLikes(product.id);
		}
	} else {
		newFavArr = [product];
	}
	// let newFavArr = user.fav.length? [...user.fav,product] : [product]
	await User.update({ fav: newFavArr }, { where: { id: idUser } });
	return "Producto likeado con éxito";
};
export const userDelFavProduct = async (
	idUser: string,
	idProduct: string
): Promise<string> => {
	let user = await User.findByPk(idUser);
	let newFavArr = user?.fav.filter((prod: any) => prod.id !== idProduct);
	await deleteLike(idProduct);
	await User.update({ fav: newFavArr }, { where: { id: idUser } });
	return "Producto likeado con éxito";
};

export const userBuyProduct = async (
	idUser: string,
	productSelled: types.basicProductInfo
): Promise<string> => {
	let user = User.findByPk(idUser);
	let newBuyArr = user.buy.length ? [user.buy, productSelled] : [productSelled];
	await User.update({ buy: newBuyArr }, { where: { id: idUser } });
	return "Producto comprado con éxito";
};
export const addNewNoti = async (
	idUser: string,
	notification:any
): Promise<string> => {
	let user = await User.findByPk(idUser);
	let allIdsNoti = user?.noti?.length? user.noti.map((n:any)=> n.id? n.id : 0) : 1
	let maxId = Math.max(allIdsNoti) + 1
	let newNotiArr = user?.noti?.length ? [{id:maxId,...notification},...user.noti] : [{id:maxId,...notification}];
	await User.update({ noti: newNotiArr }, { where: { id: idUser } });
	return "Notificacion agregada con exito";
};
export const notiViewTrue = async (
	idUser: string
): Promise<string> => {
	let user = await User.findByPk(idUser);
	let newNotiArr = user.noti.map((n:any)=>{
		if(n.viewed === false){
			return {...n, viewed: true}
		}else{
			return n
		}
	})
	await User.update({ noti: newNotiArr }, { where: { id: idUser } });
	return "Notificacion agregada con exito";
};
export const deleteNoti = async (
	idUser: string,
	idNoti: string
): Promise<string> => {
	let user = await User.findByPk(idUser);
	let newNotiArr = user.noti.filter((n:any)=> n.id !== +idNoti)
	await User.update({ noti: newNotiArr }, { where: { id: idUser } });
	return "Notificacion agregada con exito";
};
export const deleteUser = async (id:string) => {
	let user = await User.destroy({where: {id}})
	await deleteUserProducts(id);
	return !!user
}