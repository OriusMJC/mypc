import { GET_ALL_COMPONENTS, GET_ALL_DETAILS, GET_NAME, FILTER_CATEGORY, ORDER_POPULATION, ORDER_PRICE, FILTER_STATE, ADD_PRODUCT_CART, DEL_PRODUCT_CART } from "../actions"
// import { Products } from '../../../types';

function orderMayMen(array,prop){
    let newArray = array.sort((a,b)=> {
        if(a[prop] < b[prop])return 1;
        if(a[prop] > b[prop])return -1;
        return 0
      })
    return newArray
}
function orderMenMay(array,prop){
    let newArray = array.sort((a,b)=> {
        if(a[prop] < b[prop])return -1;
        if(a[prop] > b[prop])return 1;
        return 0
      })
    return newArray
}

const initialState = {
    components: [],
    allComponents:[],
    types: ['full', 'motherboard', 'procesador', 'grafica', 'ram', 'ssd', 'hdd', 'cooler', 'monitor', 'mouse', 'teclado','cables', 'fuente'],
    userDetails: {},
    productDetails: {},
    cart: []
}

export default function rootReducer(state = initialState, action: any){
    switch(action.type){
        case GET_ALL_COMPONENTS:
            return {
                ...state,
                components: action.payload,
                allComponents: action.payload
            }
        case GET_ALL_DETAILS:
            return {
                ...state,
                productDetails: action.payload
            }
        case GET_NAME:
            return {
                ...state,
                allComponents: action.payload,
                components: action.payload
            }
        case ADD_PRODUCT_CART:
            let prodExist = state.cart.find(prod => prod.id === action.payload.id)
            if(prodExist) return state 
            return {
                ...state,
                cart: [...state.cart,action.payload]
            }
        case DEL_PRODUCT_CART:
            let newArrProd = state.cart.filter(prod => prod.id !== action.payload)
            if(prodExist) return state 
            return {
                ...state,
                cart: newArrProd
            }

        case FILTER_CATEGORY:
            const allComponents = state.allComponents;
            const status = action.payload;
            if(status){
                var componentsFiltered = allComponents.filter(comp => comp.type === status)
            }
            return {
                ...state,
                components: componentsFiltered
            }

         case FILTER_STATE:
            const allState = state.allComponents;
            if(action.payload){
                var filteredStates = allState.filter(state => state.status === action.payload)
            }
            return{
                ...state,
                components: action.payload === "All" ? state.allComponents : filteredStates
            }
                
        case ORDER_POPULATION:
            let sortedPopularity = action.payload === "More Popularity"?
            orderMayMen(state.components, 'likes') :
            orderMenMay(state.components,'likes')
            return {
                ...state,
                components: action.payload === "All" ? state.allComponents : sortedPopularity
            }
        case ORDER_PRICE:
            let sortedPrice = action.payload === "More price" ?
            orderMayMen(state.components, 'price') :
            orderMenMay(state.components,'price')
            return {
                ...state,
                components: action.payload === "All" ? state.allComponents : sortedPrice
            }
        default: 
            return state
    }
}