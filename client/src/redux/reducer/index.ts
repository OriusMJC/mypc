import {
	GET_ALL_COMPONENTS,
	GET_ALL_DETAILS,
	GET_NAME,
	FILTER_CATEGORY,
	ORDER_POPULATION,
	ORDER_PRICE,
	FILTER_STATE,
	FILTER_USER,
	ADD_PRODUCT_CART,
	DEL_PRODUCT_CART,
	LOGIN_USER,
	ADD_COMMENT,
	DELETE_COMMENT,
	ADD_RESPONSE,
	DELETE_RESPONSE,
	SINGOUT_USER,
	GET_PRODUCT_CART,
	RESET_PRODUCT_DETAIL,
	GET_ALL_USERS,
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	GET_PRODUCTS_USER,
	UPDATE_EMAIL,
	// ADD_FAV,
	DEL_FAV,
	GET_ORDERS,
	SELLER_PROD,
	CHANGE_ACTUAL_PAGE,
	NOTI_VIEW,
	DELETE_NOTI,
	ADD_VISITED,
	CHANGE_LANGUAGE,
	GET_USERS_BY_ID,
	EDIT_USER
} from "../actions";
// import { Products } from '../../../types';

function orderMayMen(array, prop) {
	let newArray = array.sort((a, b) => {
		if (a[prop] < b[prop]) return 1;
		if (a[prop] > b[prop]) return -1;
		return 0;
	});
	return newArray;
}
function orderMenMay(array, prop) {
	let newArray = array.sort((a, b) => {
		if (a[prop] < b[prop]) return -1;
		if (a[prop] > b[prop]) return 1;
		return 0;
	});
	return newArray;
}

const initialState = {
	components: [],
	allComponents: [],
	types: [
		"full",
		"motherboard",
		"procesador",
		"grafica",
		"ram",
		"ssd",
		"hdd",
		"cooler",
		"monitor",
		"mouse",
		"teclado",
		"cables",
		"fuente",
	],
	allUsers: [],
	users: [],
	userDetails: { fav: [] , noti: [], visited: []},
	productDetails: { comments: [] },
	// productsCreated: [],
	cart: [],
	suggestions: {},
	orders: [],
	actualPage: 1,
	spanish: true,
	listUsers: [],
};
export default function rootReducer(state = initialState, action: any) {
	switch (action.type) {
		case GET_ALL_COMPONENTS:
			if (action.payload.length) {
				let img = {}
				for(let i = 0; i < action.payload.length; i++){
					let title = action.payload[i].title.toLowerCase().trim() 
					img[title] = action.payload[i].photo
			}
				let titles = action.payload.map((e) => e.title.toLowerCase().trim());
				let suggestionsTitle = titles.filter((item, index) => {
					return titles.indexOf(item) === index;
				});
				return {
					...state,
					components: [...action.payload],
					allComponents: [...action.payload],
					suggestions: {
						titles: suggestionsTitle,
						img,
					},
				};
			} else {
				return {
					...state,
					components: [...action.payload],
					allComponents: [...action.payload],
				};
			}
		case GET_ALL_DETAILS:
			return {
				...state,
				productDetails: action.payload,
			};
		case GET_NAME:
			return {
				...state,
				allComponents: [...action.payload],
				components: [...action.payload],
			};
		case GET_PRODUCTS_USER:
			let comp = state.allComponents.filter(
				(p: any) => p.sellerInfo?.id === action.payload
			);
			return {
				...state,
				components: [...comp],
			};
		case GET_ALL_USERS:
			return {
				...state,
				allUsers: [...action.payload],
				users: [...action.payload],
			};
		case FILTER_USER:
			let newArrUser = state.allUsers.filter(
				(u: any) =>
					u.id.includes(action.payload) ||
					u.name.toLowerCase().includes(action.payload.toLowerCase()) ||
					u.email.includes(action.payload.toLowerCase())
			);
			return {
				...state,
				users: newArrUser,
			};
		case LOGIN_USER:
			return {
				...state,
				userDetails: action.payload,
			};
		case SINGOUT_USER:
			return {
				...state,
				userDetails: {},
				listUsers: [],
			};
		case GET_PRODUCT_CART:
			return {
				...state,
				cart: [...action.payload],
			};
		case ADD_PRODUCT_CART:
			let prodExist = state.cart.find((prod) => prod.id === action.payload.id);
			if (prodExist) return state;
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		case DEL_PRODUCT_CART:
			let newArrProd = state.cart.filter((prod) => prod.id !== action.payload);
			return {
				...state,
				cart: newArrProd,
			};
		case ADD_COMMENT:
			let product = {
				...state.productDetails,
				comments: [action.payload.comment, ...state.productDetails.comments],
			};
			return {
				...state,
				productDetails: product,
			};
		case DELETE_COMMENT:
			let commentFilter = state.productDetails.comments.filter(
				(c: any) => c.id !== action.payload.idComment
			);
			let productFiltered = {
				...state.productDetails,
				comments: commentFilter,
			};

			return {
				...state,
				productDetails: productFiltered,
			};
		case ADD_RESPONSE:
			let commentsArr = state.productDetails.comments.map((c: any) => {
				if (c.id === action.payload.id) {
					c.sellerResponse = action.payload.resp;
				}
				return c;
			});
			let productsFinal = { ...state.productDetails, comments: commentsArr };
			return {
				...state,
				productDetails: productsFinal,
			};
		case DELETE_RESPONSE:
			let commentsArray = state.productDetails.comments.map((c: any) => {
				if (c.id === action.payload.id) {
					c.sellerResponse = action.payload.resp;
				}
				return c;
			});
			let productsFinalObj = {
				...state.productDetails,
				comments: commentsArray,
			};
			return {
				...state,
				productDetails: productsFinalObj,
			};
		// case ADD_FAV:
		//     const newFav = [...state.userDetails.fav, action.payload]
		//     return {
		//         ...state,
		//         fav: newFav
		//     }
		case DEL_FAV:
		    const newFavArr = state.userDetails.fav.filter((prod:any)=> prod.id !== action.payload)
			const newArr = {...state.userDetails, fav: newFavArr}
		    return {
		        ...state,
		        userDetails: newArr
		    }
		case FILTER_CATEGORY:
			const status = action.payload;
			if (status !== "All") {
				var componentsFiltered = [...state.allComponents].filter(
					(comp) => comp.type === status
				);
			}
			return {
				...state,
				components:
					status !== "All" ? componentsFiltered : [...state.allComponents],
			};

		case FILTER_STATE:
			const allState = [...state.components];
			if (action.payload) {
				var filteredStates = allState.filter(
					(state) => state.status === action.payload
				);
			}
			return {
				...state,
				components:
					action.payload === "All" 
						? [...state.allComponents] 
						: filteredStates,
			};

		case ORDER_POPULATION:
			let sortedPopularity =
				action.payload === "More Popularity"
					? orderMayMen(state.components, "likes")
					: orderMenMay(state.components, "likes");
			return {
				...state,
				components:
					action.payload === "All"
						? [...state.allComponents]
						: sortedPopularity,
			};
		case ORDER_PRICE:
			let sortedPrice =
				action.payload === "More price"
					? orderMayMen(state.components, "price")
					: orderMenMay(state.components, "price");
			return {
				...state,
				components:
					action.payload === "All" ? [...state.allComponents] : sortedPrice,
			};
		case RESET_PRODUCT_DETAIL:
			return {
				...state,
				productDetails: action.payload,
			};
		// case CREATE_PRODUCT:
		//     return {
		//         ...state,
		//         productsCreated: [...state.productsCreated, action.payload]
		//     }
		case DELETE_PRODUCT:
			let filtered = [];
			if (action.payload) {
				filtered = state.components.filter((c) => c.id !== action.payload);
			}
			return {
				...state,
				components: filtered,
			};
		case UPDATE_EMAIL:
			return {
				...state,
				userDetails: action.payload,
			};
		case GET_ORDERS:
			return {
				...state,
				orders: action.payload,
			}
		case CHANGE_ACTUAL_PAGE:
			return {
				...state,
				actualPage: action.payload,
			}
			case NOTI_VIEW:{
				let newArrNoti = state.userDetails.noti.map((n:any)=>{
					if(n.viewed === false){
						return {...n, viewed: true}
					}else{
						return n
					}
				})
				return {
					...state,
					userDetails : {...state.userDetails, noti: newArrNoti}
				}
			}
			case DELETE_NOTI:{
				let newArrNoti = state.userDetails.noti.filter((n:any)=> n.id !== action.payload.idNoti)
				return {
					...state,
					userDetails : {...state.userDetails, noti: newArrNoti}
				}
			}
			case ADD_VISITED: {
				let visitedProducts = [...state.userDetails.visited];
				if(visitedProducts.length){
					if(visitedProducts.length < 50){
						visitedProducts.push(action.payload)
					}else{
						visitedProducts.shift();
						visitedProducts = [...visitedProducts, action.payload]
					}
				}else{
					visitedProducts = [action.payload]
				}
				let newArrVisited = {...state.userDetails, visited: visitedProducts}
				return {
					...state,
					userDetails: newArrVisited,
				}
			}
		case CHANGE_LANGUAGE:
			return {
				...state,
				spanish: state.spanish === true ? false : true,
			}
			case GET_USERS_BY_ID:
			return {
				...state,
				listUsers: action.payload
			}
			case EDIT_USER: 
				return {
					...state,
					userDetails: action.payload
				}
		default:
			return state;
	}
}
