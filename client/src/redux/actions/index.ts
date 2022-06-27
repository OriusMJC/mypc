import axios from 'axios';
import { Dispatch } from 'redux';
import { addCartLH, getCartLH, removeCartLH } from 'src/services/functionsServices';
import { userSingOut } from 'src/services/userFirebase';
export const GET_ALL_COMPONENTS = "GET_ALL_COMPONENTS";
export const GET_ALL_DETAILS = "GET_ALL_DETAILS";
export const GET_NAME = "GET_NAME";
export const GET_PRODUCT_CART = "GET_PRODUCT_CART";
export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const DEL_PRODUCT_CART = "DEL_PRODUCT_CART";
export const ADD_COMMENT = "ADD_COMMENT";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const ORDER_POPULATION = "ORDER_POPULATION";
export const ORDER_PRICE = "ORDER_PRICE";
export const FILTER_STATE = "FILTER_STATE";
export const LOGIN_USER = "LOGIN_USER";
export const SINGOUT_USER = "SINGOUT_USER";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_ALL_USERS = "GET_ALL_USERS";
// export const ADD_FAV = "ADD_FAV";
// export const DEL_FAV = "DEL_FAV";

type Action = {
    type: string,
    payload: any,
}

export function getAllComponents() {
    return async(dispatch: Dispatch<Action>) => {
        try {
            let res = await axios('/products')
            dispatch({type: GET_ALL_COMPONENTS, payload: res.data.reverse()})
        } catch (error) {
            console.log(error)
        }
    }
}

export function getAllDetails(id) {
    return async(dispatch: Dispatch<Action>) => {
        try {
            let res = await axios(`/products/${id}`);
            dispatch({type: GET_ALL_DETAILS, payload: res.data})
        }catch(error) {
            console.log(error)
        }
    }
}

export function getName(name: string){
    return async(dispatch: Dispatch<Action>) => {
        try {
            let res = await axios(`/products?name=${name}`);
            dispatch({type: GET_NAME, payload: res.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export function createUser(user){
    return async() => {
        try {
            let resp = await axios.post("/users", user)
            return resp;
        } catch (error) {
            console.log(error)
        }
    }
}

export function loginUser(id){
    return async(dispatch: Dispatch<Action>) => {
        try {
            let resp = await axios(`/users/${id}`)
            dispatch({type: LOGIN_USER, payload: resp.data})
        } catch (error) {
            console.log(error)
        }
    }
}
export function singOutUser(){
    return async(dispatch: Dispatch<Action>) => {
        try {
            await userSingOut()
            dispatch({type: SINGOUT_USER, payload: {}})
        } catch (error) {
            console.log(error)
        }
    }
}

export function addFavUser(idUser: string, product:any){
    return async(dispatch: Dispatch<Action>) => {
        try {
            await axios.put(`/users/fav/${idUser}`,product);
            // dispatch({type: ADD_FAV, payload: product})
        } catch (error) {
            console.log(error)
        }
    }
}
export function delFavUser(idUser: string, idProduct:string){
    return async(dispatch: Dispatch<Action>) => {
        try {
            await axios.delete(`/users/fav/${idUser}/${idProduct}`);
            // dispatch({type: DEL_FAV, payload: idProduct})
        } catch (error) {
            console.log(error)
        }
    }
}

export function createProduct(idUser: string, product:any){
    return async() => {
        try{
            let resp = await axios.post(`/products/${idUser}`, product)
            return resp;
        } catch(error){
            console.log(error)
        }
    }
}


export function getProductsLHtoCart(){
    return async(dispatch: Dispatch<Action>) => {
        const cart = await getCartLH()
        let product = cart? cart : []
        try {
            dispatch({type: GET_PRODUCT_CART, payload: product})
        } catch (error) {
            console.log(error)
        }
    }
}
export function addProductCart(product:any){
    return async(dispatch: Dispatch<Action>) => {
        await addCartLH(product)
        try {
            dispatch({type: ADD_PRODUCT_CART, payload: product})
        } catch (error) {
            console.log(error)
        }
    }
}
export function delProductCart(idProduct:any){
    return async(dispatch: Dispatch<Action>) => {
        await removeCartLH(idProduct)
        try {
            dispatch({type: DEL_PRODUCT_CART, payload: idProduct})
        } catch (error) {
            console.log(error)
        }
    }
}
export function addProductComment(id:string,comment:any){
    return async(dispatch: Dispatch<Action>) => {
        try {
            await axios.put(`/products/comments/${id}`,comment)
            dispatch({type: ADD_COMMENT, payload: {id,comment}})
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

export function orderComponentsByPopulation(payload: any){
    return{
        type: ORDER_POPULATION,
        payload,
    }
}

export function filterComponentsByState(payload: any){
    return{
        type: FILTER_STATE,
        payload,
    }
}

export function orderComponentsByPrice(payload: any){
    return{
        type: ORDER_PRICE,
        payload,
    }
}

export function getAllUsers(){
    return async(dispatch: Dispatch<Action>) => {
        try {
            let allUsers = await axios('/users')
            dispatch({type: GET_ALL_USERS, payload: allUsers.data})
        } catch (error) {
            console.log(error)
        }
    }
}