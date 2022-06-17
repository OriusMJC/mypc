import { GET_ALL_COMPONENTS, GET_ALL_DETAILS, GET_NAME, FILTER_CATEGORY, ORDER_POPULATION, ORDER_PRICE, FILTER_STATE } from "../actions"
import { Products } from '../../../types';


const initialState = {
    components: Array<Products>,
    allComponents: Array<Products>,
    // details:
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
        
        case GET_NAME:
            return {
                ...state,
                components: action.payload
            }

        case FILTER_CATEGORY:
            const allComponents: any = state.allComponents;
            const status = action.payload;
            if(status){
                var componentsFiltered = allComponents.filter(comp => comp.type === status)
            }
            return {
                ...state,
                components: componentsFiltered
            }

         case FILTER_STATE:
                const allState: any = state.allComponents;
                if(action.payload){
                    var filteredStates = allState.filter(state => state.status === action.payload)
                }
                return{
                    ...state,
                    components: action.payload === "All" ? state.components : filteredStates
                }
                
        case ORDER_POPULATION:
                const allPopularity: any = state.components;
                let sortedPopularity = action.payload === "More Popularity" ?
                allPopularity.sort(function(a, b){
                    if(a.likes > b.likes) return 1;
                    if(a.likes < b.likes) return -1;
                    return 0
                }) :
                allPopularity.sort(function(a, b){
                    if(a.likes > b.likes) return -1;
                    if(a.likes < b.likes) return 1;
                    return 0
                })
                return {
                    ...state,
                    components: action.payload === "All" ? state.components : sortedPopularity
                }
        case ORDER_PRICE:
            const productsPrice: any = state.components
            let sortedPrice = action.payload === "More price" ?
            productsPrice.sort(function(a, b){
                if(a.price > b.price) return 1;
                if(a.price < b.price) return -1;
                return 0
            }) :
            productsPrice.sort(function(a, b){
                if(a.price > b.price) return -1;
                if(a.price < b.price) return 1;
                return 0
            })

            return {
                ...state,
                components: action.payload === "All" ? state.components : sortedPrice
            }
        default: 
            return state
    }
}