import axios from "axios";
import { useId } from "react";
import { Dispatch } from "redux";
import {
	addCartLH,
	getCartLH,
	removeCartLH,
} from "src/services/functionsServices";
import { userSingOut } from "src/services/userFirebase";
export const GET_ALL_COMPONENTS = "GET_ALL_COMPONENTS";
export const GET_ALL_DETAILS = "GET_ALL_DETAILS";
export const GET_NAME = "GET_NAME";
export const GET_PRODUCTS_USER = "GET_PRODUCTS_USER";
export const GET_PRODUCT_CART = "GET_PRODUCT_CART";
export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const DEL_PRODUCT_CART = "DEL_PRODUCT_CART";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_RESPONSE = "ADD_RESPONSE";
export const DELETE_RESPONSE = "DELETE_RESPONSE";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const ORDER_POPULATION = "ORDER_POPULATION";
export const ORDER_PRICE = "ORDER_PRICE";
export const FILTER_STATE = "FILTER_STATE";
export const FILTER_USER = "FILTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const SINGOUT_USER = "SINGOUT_USER";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const RESET_PRODUCT_DETAIL = "RESET_PRODUCT_DETAIL";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const SEARCH_SUGGESTIONS = "SEARCH_SUGGESTIONS";
// export const ADD_FAV = "ADD_FAV";
export const DEL_FAV = "DEL_FAV";
export const NOTI_VIEW = "NOTI_VIEW";
export const DELETE_NOTI = "DELETE_NOTI";
export const GET_ORDERS = "GET_ORDERS"
export const SELLER_PROD = "SELLER_PROD";
export const CHANGE_ACTUAL_PAGE = "CHANGE_ACTUAL_PAGE"
export const GET_USERS_BY_ID = "GET_USERS_BY_ID";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const DELETE_USER = "DELETE_USER";

type Action = {
	type: string;
	payload: any;
};

export function getAllComponents() {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let res = await axios("/products");
			dispatch({ type: GET_ALL_COMPONENTS, payload: res.data.reverse() });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getAllDetails(id) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let res = await axios(`/products/${id}`);
			dispatch({ type: GET_ALL_DETAILS, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getName(name: string) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let res = await axios(`/products?name=${name}`);
			dispatch({ type: GET_NAME, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};
}
export function getProductsUser(id: string){
    return (dispatch: Dispatch<Action>) => {
        dispatch({type: GET_PRODUCTS_USER, payload: id})
    }
}
export function filterUser(name: string){
    return (dispatch: Dispatch<Action>) => {
        dispatch({type: FILTER_USER, payload: name})
    }
}

export function createUser(user) {
	return async () => {
		try {
			let resp = await axios.post("/users", user);
			return resp;
		} catch (error) {
			console.log(error);
		}
	};
}

export function getUserData(id) {
	return async () => {
		try {
			let resp = await axios(`/users/${id}`);
			return resp.data;
		} catch (error) {
			console.log(error);
		}
	};
}
export function editUserData(id: string, newDataUser: object) {
	return async () => {
		try {
			let resp = await axios.put(`/users/${id}`, newDataUser);
			return resp.data;
		} catch (err) {
			console.log(err);
		}
	};
}

export function loginUser(id) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let resp = await axios(`/users/${id}`);
			dispatch({ type: LOGIN_USER, payload: resp.data });
		} catch (error) {
			console.log(error);
		}
	};
}
export function singOutUser() {
	return async (dispatch: Dispatch<Action>) => {
		try {
			await userSingOut();
			dispatch({ type: SINGOUT_USER, payload: {} });
		} catch (error) {
			console.log(error);
		}
	};
}

export function addFavUser(idUser: string, product: any) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			await axios.put(`/users/fav/${idUser}`, product);
			// dispatch({type: ADD_FAV, payload: product})
		} catch (error) {
			console.log(error);
		}
	};
}
export function delFavUser(idUser: string, idProduct: string) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			await axios.delete(`/users/fav/${idUser}/${idProduct}`);
			dispatch({type: DEL_FAV, payload: idProduct})
		} catch (error) {
			console.log(error);
		}
	};
}

export function createProduct(idUser: string, product: any) {
	return async () => {
		try {
			let resp = await axios.post(`/products/${idUser}`, product);
			return resp;
		} catch (error) {
			console.log(error);
		}
	};
}

export function deleteProduct(idProduct: string) {
	return async () => {
		try {
			let res = await axios.delete(`/products/${idProduct}`);
			return res;
		} catch (error) {
			console.log(error);
		}
	};
}

export function updateProduct(id: string, data: any) {
	return async () => {
		try {
			let res = await axios.put(`/products/${id}`, data);
			return res;
		} catch (error) {
			console.log(error);
		}
	};
}
export function getProductsLHtoCart() {
	return async (dispatch: Dispatch<Action>) => {
		const cart = await getCartLH();
		let product = cart ? cart : [];
		try {
			dispatch({ type: GET_PRODUCT_CART, payload: product });
		} catch (error) {
			console.log(error);
		}
	};
}
export function addProductCart(product: any) {
	return async (dispatch: Dispatch<Action>) => {
		await addCartLH(product);
		try {
			dispatch({ type: ADD_PRODUCT_CART, payload: product });
		} catch (error) {
			console.log(error);
		}
	};
}
export function delProductCart(idProduct: any) {
	return async (dispatch: Dispatch<Action>) => {
		await removeCartLH(idProduct);
		try {
			dispatch({ type: DEL_PRODUCT_CART, payload: idProduct });
		} catch (error) {
			console.log(error);
		}
	};
}
export function addProductComment(id: string, comment: any) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			await axios.put(`/products/comments/${id}`, comment);
			dispatch({ type: ADD_COMMENT, payload: { id, comment } });
		} catch (error) {
			console.log(error);
		}
	};
}
export function addSellerResp(idProduct: string, resp: any) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			await axios.put(`/products/comments/update/${idProduct}`, resp);
			dispatch({ type: ADD_RESPONSE, payload: { idProduct, resp } });
		} catch (error) {
			console.log(error);
		}
	};
}

export function deleteProductComment(id: string, idComment: any) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			await axios.delete(`/products/comments/delete/${id}/${idComment}`);
			dispatch({ type: DELETE_COMMENT, payload: { id, idComment } });
		} catch (error) {
			console.log(error);
		}
	};
}

export function deleteSellerResp(idProduct:string, resp:any){
    return async(dispatch: Dispatch<Action>) => {
        try {
            await axios.put(`/products/comments/delete/${idProduct}`, resp)
            dispatch({type: DELETE_RESPONSE, payload: {idProduct, resp}})
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterComponentsByCategory(payload: string){
    return {
        type: FILTER_CATEGORY,
        payload,
    }
}

export function orderComponentsByPopulation(payload: any) {
	return {
		type: ORDER_POPULATION,
		payload,
	};
}

export function filterComponentsByState(payload: any) {
	return {
		type: FILTER_STATE,
		payload,
	};
}

export function orderComponentsByPrice(payload: any) {
	return {
		type: ORDER_PRICE,
		payload,
	};
}
export function resetProductDetail() {
	return {
		type: RESET_PRODUCT_DETAIL,
		payload: { comments: [] },
	};
}
export function changeActualPage(num:number) {
	return {
		type: CHANGE_ACTUAL_PAGE,
		payload: num,
	};
}

export function getAllUsers() {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let allUsers = await axios("/users");
			dispatch({ type: GET_ALL_USERS, payload: allUsers.data });
		} catch (error) {
			console.log(error);
		}
	};
}
export function emailUpdateUser(id: string, newEmail: string) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let newUserData = await axios.put(`/users/${id}/email`, {
				email: newEmail,
			});
			dispatch({ type: UPDATE_EMAIL, payload: newUserData.data });
		} catch (error) {
			console.log(error);
		}
	};
};
export function getOrders(id: string) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let orders = await axios.post(`/users/orders/${id}`)
			console.log(orders, "=============")
			dispatch({type: GET_ORDERS, payload: orders.data})
		} catch (error) {
			console.log(error)
		}
	}
}
export function getAllOrders() {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let orders = await axios.post(`/users/orders`)
			dispatch({type: GET_ORDERS, payload: orders.data})
		} catch (error) {
			console.log(error)
		}
	}
}
export function postNoti(idUser,noti) {
	return async () => {
		try {
			await axios.post(`/users/newNoti/${idUser}`,noti)
		} catch (error) {
			console.log(error)
		}
	}
}
export function viewedNoti(idUser) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			await axios.put(`/users/updateNoti/${idUser}`)
			dispatch({type: NOTI_VIEW, payload: idUser})
		} catch (error) {
			console.log(error)
		}
	}
}
export function deleteNoti(idUser,idNoti) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			await axios.delete(`/users/deleteNoti/${idUser}/${idNoti}`)
			dispatch({type: DELETE_NOTI, payload: {idUser,idNoti}})
		} catch (error) {
			console.log(error)
		}
	}
}
export function changeLanguage(){
	return {
		type: CHANGE_LANGUAGE
	}
}
export function getUsersById(arrayUsers) {
	return async (dispatch: Dispatch<Action>) => {
		try {
			let users = await axios.post("/users/users-list", arrayUsers);
			dispatch({type: GET_USERS_BY_ID, payload: users.data})
		} catch (err) {
			console.log(err)
		}
	}
}
export async function deleteUser(id) {
	try {
		let response = await axios.delete(`/users/${id}`);
		if(response) {
			return response
			// let users = await getAllUsers()
			// console.log(users)
		}		
	} catch (error) {
		console.log(error)		
	}
	// return async (dispatch: Dispatch<Action>) => {
	// 	try {
	// 		let response = await axios.delete(`/users/${id}`);
	// 		if(response) {
	// 			// let users = await getAllUsers()
	// 			// console.log(users)
	// 			dispatch({type: DELETE_USER, payload: ""})
	// 		}
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }
}