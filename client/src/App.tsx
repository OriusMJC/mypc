import { Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import ProductDetails from "./components/Product/ProductDetails";
import UserDetail from "./components/User/UserDetail";
import Fav from "./components/User/Fav";
import Register from "./components/Login/Register";
import Cart from "./components/User/Cart";
import Login from "./components/Login/Login";
import Contact from "./components/Contact";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import CreateProduct from "./components/Product/CreateProduct";
import UserProducts from "./components/User/UserProducts";
import UserEditProduct from "./components/User/UserEditProduct";
import { loginVerifycation } from "./services/userFirebase";
import { useAppDispatch } from "./config/config";
import style from "./App.module.css";
import Help from "./components/Help/Help";
import Faq from "./components/Help/Faq/Faq";
import HelpSelling from "./components/Help/HelpSelling/HelpSelling";
import PublicationsQA from "./components/Help/HelpSelling/PublicationsQA";
import Sales from "./components/Help/HelpSelling/Sales";
import Charges from "./components/Help/HelpSelling/Charges";
import ReputationAndOpinions from "./components/Help/HelpSelling/ReputationAndOpinions";
import Cancellations from "./components/Help/HelpBuying/Cancellations";
import Posts from "./components/Help/HelpSelling/Posts";
import Protection from "./components/Help/HelpSelling/Protection";
import Observers from "./components/Help/HelpSelling/Observers";
import Buys from "./components/Help/HelpBuying/Buys";
import Returns from "./components/Help/HelpBuying/Returns";
import Changes from "./components/Help/HelpBuying/Changes";
import Opinions from "./components/Help/HelpBuying/Opinions";
import ToAsk from "./components/Help/HelpBuying/ToAsk";
import CreditMarket from "./components/Help/HelpBuying/CreditMarket";
import Subscriptions from "./components/Help/HelpBuying/Subscriptions";
import HelpBuying from "./components/Help/HelpBuying/HelpBuying";
import AdminManage from "./components/Admin/AdminManage";
import UserEditDetails from "./components/User/UserEditDetails";
import UserEditPasswordOrMail from "./components/User/UserEditPasswordOrMail";
import OrderDetails from "./components/User/OrderDetails";
import Direction from "./components/User/Direction";
import DirectionOrder from "./components/User/DirectionOrder";
import MapView from "./components/Map/MapView";
import Chat from "./components/Chat/Chat";
import ChatList from "./components/Chat/ChatList";
import ChatCreated from "./components/Chat/ChatCreated";


// import NavButtons from './components/NavButtons'

function App() {
	const dispatch = useAppDispatch();
	loginVerifycation(dispatch);
	return (
		<div className={style.App}>
			<NavBar />
			{/* <NavButtons/> */}
			<Routes>
				{/* LOGIN */}
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />

				{/* HOME */}
				<Route path="/" element={<Home />} />

				{/* PRODUCT */}
				<Route path="/detail/:idProduct" element={<ProductDetails />} />

				
				{/* USER */}
				<Route path="/fav" element={<Fav />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/user/createProduct" element={<CreateProduct />} />
				<Route path="/user/userProducts" element={<UserProducts />} />
				<Route
					path="/user/userEditProduct/:idProduct"
					element={<UserEditProduct />}
				/>
				<Route path="/user/detail" element={<UserDetail />} />
				<Route path="/user/detail/order/:idProduct" element={<OrderDetails />} />
				{/* CHANGE DATA USER */}
				<Route path="/user/detail/edit" element={<UserEditDetails />} />
				<Route
					path="/user/detail/password"
					element={<UserEditPasswordOrMail />}
				/>
				<Route path="/user/detail/mail" element={<UserEditPasswordOrMail />} />

				{/* CHAT */}
				<Route path="/list/chats/:userId" element={<ChatList/>} />
				<Route path="/chat/:from/:to" element={<Chat/>} />
				<Route path="/chatbuild/:from/:to" element={<ChatCreated/>} />

				{/* MAPAS */}
				<Route path="/user/direction" element={<Direction/>} />
				<Route path="/direction/:id" element={<DirectionOrder/>}/>
				<Route path="/user/admin/map" element={<MapView user={null} manually={false}/>} />

				{/* ADMIN */}
				<Route path="/user/admin" element={<AdminManage />} />

				{/* HELP */}
				<Route path="/help" element={<Help />} />
				<Route path="help">
					<Route path="faq" element={<Faq />} />
					<Route path="selling" element={<HelpSelling />} />
					<Route path="buying" element={<HelpBuying />} />
				</Route>
				<Route path="/help/selling" element={<HelpSelling />} />
				<Route path="selling">
					<Route path="publications" element={<PublicationsQA />} />
					<Route path="sales" element={<Sales />} />
					<Route path="charges" element={<Charges />} />
					<Route path="reputation" element={<ReputationAndOpinions />} />
					<Route path="cancellations" element={<Cancellations />} />
					<Route path="posts" element={<Posts />} />
					<Route path="protection" element={<Protection />} />
					<Route path="observers" element={<Observers />} />
				</Route>
				<Route path="/help/buying" element={<HelpSelling />} />
				<Route path="buying">
					<Route path="buys" element={<Buys />} />
					<Route path="returns" element={<Returns />} />
					<Route path="changes" element={<Changes />} />
					<Route path="cancellations" element={<Cancellations />} />
					<Route path="opinions" element={<Opinions />} />
					<Route path="toask" element={<ToAsk />} />
					<Route path="creditmarket" element={<CreditMarket />} />
					<Route path="subscriptions" element={<Subscriptions />} />
				</Route>

				{/* CONTACT */}
				<Route path="/contact" element={<Contact />} />

			</Routes>
			<Footer />
		</div>
	);
}

export default App;
