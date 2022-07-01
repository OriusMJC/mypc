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
	SINGOUT_USER,
	GET_PRODUCT_CART,
	RESET_PRODUCT_DETAIL,
	GET_ALL_USERS,
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	GET_PRODUCTS_USER,
	UPDATE_EMAIL,
	// ADD_FAV,
	// DEL_FAV
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
	userDetails: { fav: [] },
	productDetails: { comments: [] },
	// productsCreated: [],
	cart: [],
	suggestions: {},
};

export default function rootReducer(state = initialState, action: any) {
	switch (action.type) {
		case GET_ALL_COMPONENTS:
			if (action.payload.length) {
				// let img = action.payload.map(e => e.)
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
						img: {

						}
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
			console.log(newArrUser);
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
			const allState = state.allComponents;
			if (action.payload) {
				var filteredStates = allState.filter(
					(state) => state.status === action.payload
				);
			}
			return {
				...state,
				components:
					action.payload === "All" ? [...state.allComponents] : filteredStates,
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
		default:
			return state;
	}
}

// export default function rootReducer(state = initialState, action: any) {
// 	switch (action.type) {
// 		case GET_ALL_COMPONENTS:
// 			return {
// 				...state,
// 				components: [...action.payload],
// 				allComponents: [...action.payload],
// 			};
// 		case GET_ALL_DETAILS:
// 			return {
// 				...state,
// 				productDetails: action.payload,
// 			};
// 		case GET_NAME:
// 			return {
// 				...state,
// 				allComponents: [...action.payload],
// 				components: [...action.payload],
// 			};
// 		case GET_ALL_USERS:
// 			return {
// 				...state,
// 				allUsers: [...action.payload],
// 				users: [...action.payload],
// 			};
// 		case FILTER_USER:
// 			let newArrUser = state.allUsers.filter(
// 				(u: any) =>
// 					u.id.includes(action.payload) ||
// 					u.name.toLowerCase().includes(action.payload.toLowerCase()) ||
// 					u.email.includes(action.payload.toLowerCase())
// 			);
// 			console.log(newArrUser);
// 			return {
// 				...state,
// 				users: newArrUser,
// 			};
// 		case LOGIN_USER:
// 			return {
// 				...state,
// 				userDetails: action.payload,
// 			};
// 		case SINGOUT_USER:
// 			return {
// 				...state,
// 				userDetails: {},
// 			};
// 		case GET_PRODUCT_CART:
// 			return {
// 				...state,
// 				cart: [...action.payload],
// 			};
// 		case ADD_PRODUCT_CART:
// 			let prodExist = state.cart.find((prod) => prod.id === action.payload.id);
// 			if (prodExist) return state;
// 			return {
// 				...state,
// 				cart: [...state.cart, action.payload],
// 			};
// 		case DEL_PRODUCT_CART:
// 			let newArrProd = state.cart.filter((prod) => prod.id !== action.payload);
// 			return {
// 				...state,
// 				cart: newArrProd,
// 			};
// 		case ADD_COMMENT:
// 			let product = {
// 				...state.productDetails,
// 				comments: [action.payload.comment, ...state.productDetails.comments],
// 			};
// 			return {
// 				...state,
// 				productDetails: product,
// 			};
// 		case DELETE_COMMENT:
// 			let commentFilter = state.productDetails.comments.filter(
// 				(c: any) => c.id !== action.payload.idComment
// 			);
// 			let productFiltered = {
// 				...state.productDetails,
// 				comments: commentFilter,
// 			};

// 			return {
// 				...state,
// 				productDetails: productFiltered,
// 			};
// 		case ADD_RESPONSE:
// 			let commentsArr = state.productDetails.comments.map((c: any) => {
// 				if (c.id === action.payload.id) {
// 					c.sellerResponse = action.payload.resp;
// 				}
// 				return c;
// 			});
// 			let productsFinal = { ...state.productDetails, comments: commentsArr };
// 			return {
// 				...state,
// 				productDetails: productsFinal,
// 			};
// 		// case ADD_FAV:
// 		//     const newFav = [...state.userDetails.fav, action.payload]
// 		//     return {
// 		//         ...state,
// 		//         fav: newFav
// 		//     }
// 		// case DEL_FAV:
// 		//     const newFavArr = state.userDetails.fav.filter((prod:any)=> prod.id !== action.payload)
// 		//     return {
// 		//         ...state,
// 		//         fav: newFavArr
// 		//     }

// 		case FILTER_CATEGORY:
// 			const status = action.payload;
// 			if (status !== "All") {
// 				var componentsFiltered = [...state.allComponents].filter(
// 					(comp) => comp.type === status
// 				);
// 			}
// 			return {
// 				...state,
// 				components:
// 					status !== "All" ? componentsFiltered : [...state.allComponents],
// 			};

// 		case FILTER_STATE:
// 			const allState = state.allComponents;
// 			if (action.payload) {
// 				var filteredStates = allState.filter(
// 					(state) => state.status === action.payload
// 				);
// 			}
// 			return {
// 				...state,
// 				components:
// 					action.payload === "All" ? [...state.allComponents] : filteredStates,
// 			};

// 		case ORDER_POPULATION:
// 			let sortedPopularity =
// 				action.payload === "More Popularity"
// 					? orderMayMen(state.components, "likes")
// 					: orderMenMay(state.components, "likes");
// 			return {
// 				...state,
// 				components:
// 					action.payload === "All"
// 						? [...state.allComponents]
// 						: sortedPopularity,
// 			};
// 		case ORDER_PRICE:
// 			let sortedPrice =
// 				action.payload === "More price"
// 					? orderMayMen(state.components, "price")
// 					: orderMenMay(state.components, "price");
// 			return {
// 				...state,
// 				components:
// 					action.payload === "All" ? [...state.allComponents] : sortedPrice,
// 			};
// 		case RESET_PRODUCT_DETAIL:
// 			return {
// 				...state,
// 				productDetails: action.payload,
// 			};
// 		// case CREATE_PRODUCT:
// 		//     return {
// 		//         ...state,
// 		//         productsCreated: [...state.productsCreated, action.payload]
// 		//     }
// 		case DELETE_PRODUCT:
// 			let filtered = [];
// 			if (action.payload) {
// 				filtered = state.components.filter((c) => c.id !== action.payload);
// 			}
// 			return {
// 				...state,
// 				components: filtered,
// 			};
// 		case UPDATE_EMAIL:
// 			return {
// 				...state,
// 				userDetails: action.payload,
// 			};
// 		default:
// 			return state;
// 	}
// }
