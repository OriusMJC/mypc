import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
// import s from './App.module.css';
import './App.css'
import ProductDetails from './components/ProductDetails';
import UserDetail from './components/UserDetail';
import Fav from './components/Fav';
import Register from './components/Register';
import Cart from './components/Cart';
import Login from './components/Login';
import Contact from './components/Contact'
import Searchbar from './components/Searchbar';
import Footer from './components/Footer'
import { loginVerifycation } from './services/userFirebase';
import { useAppDispatch } from './config/config';
// import NavButtons from './components/NavButtons'

function App()  {
  const dispatch = useAppDispatch()
  loginVerifycation(dispatch)
  return (
    <div className='App'>
      <Searchbar/>
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
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
