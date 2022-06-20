import axios from 'axios';
import { Dispatch } from 'redux';
export const GET_ALL_COMPONENTS = "GET_ALL_COMPONENTS";
export const GET_ALL_DETAILS = "GET_ALL_DETAILS";
export const GET_NAME = "GET_NAME";
export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const DEL_PRODUCT_CART = "DEL_PRODUCT_CART";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const ORDER_POPULATION = "ORDER_POPULATION";
export const ORDER_PRICE = "ORDER_PRICE";
export const FILTER_STATE = "FILTER_STATE";

type Action = {
    type: string,
    payload: any,
}

export function getAllComponents() {
    return async(dispatch: Dispatch<Action>) => {
        try {
            let res = await axios('/products')
            dispatch({type: GET_ALL_COMPONENTS, payload: res.data})
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

export function addFavUser(idUser: string, product:any){
    return async() => {
        try {
            await axios.put(`/fav/${idUser}`,product);
        } catch (error) {
            console.log(error)
        }
    }
}
export function delFavUser(idUser: string, idProduct:any){
    return async() => {
        try {
            await axios.delete(`/fav/${idUser}`,idProduct);
        } catch (error) {
            console.log(error)
        }
    }
}

export function delProductCart(idProduct:any){
    return async(dispatch: Dispatch<Action>) => {
        try {
            dispatch({type: DEL_PRODUCT_CART, payload: idProduct})
        } catch (error) {
            console.log(error)
        }
    }
}
export function addProductCart(product:any){
    return async(dispatch: Dispatch<Action>) => {
        try {
            dispatch({type: DEL_PRODUCT_CART, payload: product})
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