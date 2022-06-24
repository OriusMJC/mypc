import {Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css';
import ProductDetails from './components/Product/ProductDetails';
import UserDetail from './components/User/UserDetail';
import Fav from './components/User/Fav';
import Register from './components/Login/Register';
import Cart from './components/User/Cart';
import Login from './components/Login/Login';
import Contact from './components/Contact'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import CreateProduct from './components/Product/CreateProduct'
import { loginVerifycation } from './services/userFirebase';
import { useAppDispatch } from './config/config';
import style from './App.module.css'
// import NavButtons from './components/NavButtons'

function App()  {
  const dispatch = useAppDispatch()
  loginVerifycation(dispatch)
  return (
    <div className={style.App}>
      <NavBar/>
      {/* <NavButtons/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:idProduct' element={<ProductDetails/>}/>
        <Route path='/userdetail' element={<UserDetail/>}/>
        <Route path='/fav' element={<Fav/>}/>        
        <Route path='/cart' element={<Cart/>}/>        
        <Route path='/buy' element={<Cart/>}/>        
        <Route path='/user/register' element={<Register/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/user/createProduct' element={<CreateProduct/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
