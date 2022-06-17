import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import ProductDetails from './components/ProductDetails';
import UserDetails from './components/UserDetail';
import Fav from './components/Fav';
import Register from './components/Register';

function App()  {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:idProduct' element={<ProductDetails/>}/>
        <Route path='/userdetail' element={<UserDetails/>}/>
        <Route path='/fav' element={<Fav/>}/>        
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
