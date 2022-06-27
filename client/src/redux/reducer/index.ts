import { 
    GET_ALL_COMPONENTS, 
    GET_ALL_DETAILS, 
    GET_NAME, 
    FILTER_CATEGORY, 
    ORDER_POPULATION, 
    ORDER_PRICE, 
    FILTER_STATE, 
    ADD_PRODUCT_CART, 
    DEL_PRODUCT_CART,
    LOGIN_USER, 
    ADD_COMMENT, 
    SINGOUT_USER,
    GET_PRODUCT_CART, 
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    // ADD_FAV, 
    // DEL_FAV
} from "../actions"
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
    userDetails: {fav:[]},
    productDetails: {comments: []},
    // productsCreated: [],
    cart: []
}

export default function rootReducer(state = initialState, action: any){
    switch(action.type){
        case GET_ALL_COMPONENTS:
            return {
                ...state,
                components: [...action.payload],
                allComponents: [...action.payload]
            }
        case GET_ALL_DETAILS:
            return {
                ...state,
                productDetails: action.payload
            }
        case GET_NAME:
            return {
                ...state,
                allComponents: [...action.payload],
                components: [...action.payload]
            }
        case LOGIN_USER:
            return {
                ...state,
                userDetails: action.payload
            }
        case SINGOUT_USER:
            return {
                ...state,
                userDetails: {}
            }
        case GET_PRODUCT_CART:
            return {
                ...state,
                cart: [...action.payload]
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
            return {
                ...state,
                cart: newArrProd
            }
        case ADD_COMMENT:
            let product = {...state.productDetails,comments:[action.payload.comment,...state.productDetails.comments]}
            return {
                ...state,
                productDetails: product
            }
            
        // case ADD_FAV:
        //     const newFav = [...state.userDetails.fav, action.payload]
        //     return {
        //         ...state,
        //         fav: newFav
        //     }
        // case DEL_FAV:
        //     const newFavArr = state.userDetails.fav.filter((prod:any)=> prod.id !== action.payload)
        //     return {
        //         ...state,
        //         fav: newFavArr
        //     }

        case FILTER_CATEGORY:
            const status = action.payload;
            if(status !== 'All'){
                var componentsFiltered = [...state.allComponents].filter(comp => comp.type === status)
            }
            return {
                ...state,
                components: status !== 'All' ? componentsFiltered : [...state.allComponents]
            }

         case FILTER_STATE:
            const allState = state.allComponents;
            if(action.payload){
                var filteredStates = allState.filter(state => state.status === action.payload)
            }
            return{
                ...state,
                components: action.payload === "All" ? [...state.allComponents] : filteredStates
            }
                
        case ORDER_POPULATION:
            let sortedPopularity = action.payload === "More Popularity"?
            orderMayMen(state.components, 'likes') :
            orderMenMay(state.components,'likes')
            return {
                ...state,
                components: action.payload === "All" ? [...state.allComponents] : sortedPopularity
            }
        case ORDER_PRICE:
            let sortedPrice = action.payload === "More price" ?
            orderMayMen(state.components, 'price') :
            orderMenMay(state.components,'price')
            return {
                ...state,
                components: action.payload === "All" ? [...state.allComponents] : sortedPrice
            }
        // case CREATE_PRODUCT:
        //     return {
        //         ...state,
        //         productsCreated: [...state.productsCreated, action.payload]
        //     }
        case DELETE_PRODUCT:
            console.log(action.payload)
        default: 
            return state
    }
}