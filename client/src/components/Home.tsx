import { useState, useEffect } from 'react';
import {useSelector } from 'react-redux';
import { getAllComponents} from '../redux/actions';
import { useAppDispatch  } from '../config/config';
import Pages from './ProductPage/Pages';
import Nav from './NavFilter';
// import Footer from './Footer'
import s from './Styles/Home.module.css'
import { userData } from 'src/services/userFirebase';
// import { Link } from 'react-router-dom';
// import { Products } from '../../types'
// import ProductsCards from './ProductsCards';

//seteo de estados
// interface AppState {
//   currentPage: number;
//   productsPerPage: number;
// }

//tipos
// type ProductsCards = Products;

export default function Home() {
  const dispatch = useAppDispatch();
  const allComponents = useSelector((state: any) => state.components);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [refresh,setRefresh] = useState(1)
  
  // const isUserLogin= async()=>{
  //   let resId = await userData()
  //   if(resId){
  //     dispatch(loginUser(resId))
  //   }
  // }
  

  useEffect(() => {
    let res = userData()
    console.log(res)
    // isUserLogin()
    dispatch(getAllComponents());
 }, [dispatch]); 

 

  return(  
    <div className = {s.homeContainer}>
      <div>
      <Nav 
        refresh={refresh} 
        setRefresh={setRefresh} 
        setProductsPerPage={setProductsPerPage}
        />
      <div className = {s.slider}>
        <ul>
          <li>
            <img src="https://i.pinimg.com/originals/2e/8c/c8/2e8cc8d8577a27b2829b75269dda0f29.jpg"></img>
          </li>
          <li>
            <img src="https://i.pinimg.com/originals/20/f5/35/20f535c616bbe807a1166e5661b396fd.jpg"></img>
          </li>
          <li>
            <img src="https://wallpapercave.com/wp/wp4585047.jpg"></img>
          </li>
          <li>
            <img src="https://cutewallpaper.org/21/gaming-setup-wallpaper/1920x1080-Gaming-Setup-Gaming-Setups-Wallbang-.jpg"></img>
          </li>
        </ul>
      </div>
      <Pages 
        productsPerPage  = {productsPerPage}
        allComponents = {allComponents}
        refresh = {refresh}
        />
      </div>
    </div>
  )
}
