import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import ProductDetails from './components/ProductDetails';
import UserDetails from './components/UserDetail';
import Fav from './components/Fav';
import Register from './components/Register';
import Cart from './components/Cart';
import Login from './components/Login';

function App()  {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:idProduct' element={<ProductDetails/>}/>
        <Route path='/userdetail' element={<UserDetails/>}/>
        <Route path='/fav' element={<Fav/>}/>        
        <Route path='/cart' element={<Cart/>}/>        
        <Route path='/buy' element={<Cart/>}/>        
        <Route path='/user/register' element={<Register/>}/>
        <Route path='/user/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
