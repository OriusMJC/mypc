import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { delProductCart, getProductsLHtoCart, postNoti } from "src/redux/actions";
import StripeCheckout from "react-stripe-checkout";
import s from "../Styles/Cart.module.css";
import axios from "axios";
import logo from '../../media/logo1.png'
// import ProductsCards from "./ProductsCards"

export default function Cart() {
	const dispatch = useAppDispatch();
	const [listPrice, setListPrice] = useState([]);
	const user = useSelector((store: any) => store.userDetails);
	const [precioTotal, setPrecioTotal] = useState(0);
	let products = true;
	let productsCart = useSelector((store: any) => store.cart);
	let idsArr = [];
	productsCart = productsCart.filter((prod: any) => {
		if (!idsArr.includes(prod.id)) {
			idsArr.push(prod.id);
			return prod;
		}
	});
	// ==============================================
	// ============== LOGICA DE STRIPE ==============
	// ==============================================
	// let [totalPrice, setTotalPrice] = useState({
	// 	price: 200,
	// });
	let priceForStripe = precioTotal * 100;
	let tokenKey = "pk_test_51LGmEQFUyCKJpzqxqIy615cuo6fzw9piBYzGS7ek5KQkW55LDarHinS2GrBB7gIstqMSkMgVDfc57lpol4q7BYvB00RWv3BVxJ";
		
	let payNow = async (token) => {
		try {
			let purchaseData = {
			  user,
        listPrice,
			}
			const response = await axios.post("users/payments", {
				amount: priceForStripe,
				token,
        purchaseData,
			});
			if (response.status === 200) {
				productsCart.map(e => handleKickCart(e.id)) 
				await handleNotiSeller()
				setPrecioTotal(0);
				setListPrice([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	// ==============================================
	// ==============================================
	async function handleNotiSeller(){
		await productsCart.forEach(async (p:any)=>{
			let msg = {
				prodId: p.id,
				url: `/user/userProducts`,
				photo: p.photo[0],
				title: 'Vendido!',
				msg: 'Has vendido este producto!',
				date: Date().slice(4,24),
				sellerId: p.seller?.id,
				buyer: user?.id,
				viewed: false,
			}
			await dispatch(postNoti(p.seller?.id,msg))
		})
	}
	function handlePrice(e: any) {
		let list = [];
		let price = 0;
		listPrice.map((p: any) => {
			if (p.id === e.target.id) {
				if (p.cant < e.target.value) {
					list.push({ ...p, cant: e.target.value });
					price = price + p.price * Number(e.target.value);
				} else if (p.cant > e.target.value) {
					list.push({ ...p, cant: e.target.value });
					price = price + p.price * Number(e.target.value);
				} else {
					list.push(p);
					price = price + p.price;
				}
			} else {
				list.push(p);
				price = price + p.price;
			}
		});
		setListPrice(list);
		setPrecioTotal(price);
	}
	function handleDeletePrice(id) {
		let list = [];
		let price = 0;
		listPrice.map((p: any) => {
			if (p.id !== id) {
				list.push(p);
				price = price + p.price * p.cant;
			}
		});
		setListPrice(list);
		setPrecioTotal(price);
	}
	function getPrice() {
		let list = [];
		let price = 0;
		productsCart.forEach((p: any) => {
			list.push({ seller: p.seller ,id: p.id, price: p.price, cant: 1, stock: p.cant, title: p.title, photo: p.photo, type: p.type, status: p.status });
			price = price + p.price;
		});
		setListPrice(list);
		setPrecioTotal(price);
	}
	function handleKickCart(id) {
		dispatch(delProductCart(id));
		handleDeletePrice(id);
	}
	useEffect(() => {
		dispatch(getProductsLHtoCart())
	}, []);
	useEffect(() => {
		getPrice();
	}, [user, dispatch]);
	return (
		<div className={s.favContainer}>
			<section className={s.section}>
				{productsCart.length ? (
					productsCart.map((prod) => (
						<div key={prod.key} className={s.prodFav}>
							<div className={s.containerProduct}>
								<Link to={`/detail/${prod.id}`}>
									<div className={s.imgProdFav}>
										<img src={prod.photo[0]} alt="" />
									</div>
								</Link>
								<div className={s.infoProduct}>
									<Link to={`/detail/${prod.id}`}>
										<h2>{prod.title}</h2>
									</Link>
									<div className={s.infoDetailsProduct}>
										<h3>Precio: ${prod.price}</h3>
										<h4>Likes: {prod.likes}</h4>
									</div>
								</div>
							</div>
							<div className={s.extra}>
								<h4>{prod.status}</h4>
								<input
									placeholder="1"
									id={prod.id}
									name={prod.price}
									type="number"
									min="1"
									max={String(prod.cant)}
									onChange={handlePrice}
								/>
								<button
									className={s.button}
									onClick={() => {
										handleKickCart(prod.id);
									}}
								>
									<i className="fa-solid fa-x"></i>
								</button>
								{/* </div> */}
							</div>
						</div>
					))
				) : (
					<div>
						<h1>Aún no has agregado nada al carrito!</h1>
						{(products = false)}
					</div>
				)}
			</section>
			<section className={s.sectionButtons}>
				<b>Total: ${precioTotal}</b>
				<b>IVA incluido.</b>
				<Link to="/">
					<button className={s.button}>Seguir comprando</button>
				</Link>
				{user && products === true ? (
					user.id ? (
							<StripeCheckout
								stripeKey={tokenKey}
								label="Pagar ahora"
								name="Pagar con tarjeta de crédito"
								billingAddress
								shippingAddress
								amount={priceForStripe}
								description={`Tu total es de ${precioTotal}`}
								token={payNow}
								image={logo}
							/>
					) : (
						<Link to="/login">
							<button className={s.button}>Loguearse</button>
						</Link>
					)
				) : null}
			</section>
		</div>
	);
}
