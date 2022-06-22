import { useState, useEffect } from 'react';
import {useSelector } from 'react-redux';
import { getAllComponents} from '../redux/actions';
import { useAppDispatch  } from '../config/config';
import Pages from './Pages';
import Nav from './Nav';
import s from './Styles/Home.module.css'
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
  useEffect(() => {
    dispatch(getAllComponents());
 }, [dispatch]); 

 

  return(  
    <div>
      <Nav 
        refresh={refresh} 
        setRefresh={setRefresh} 
        setProductsPerPage={setProductsPerPage}
        />
      <Pages 
        productsPerPage  = {productsPerPage}
        allComponents = {allComponents}
        refresh = {refresh}
        />
      
      <footer>
        <p>Soy el footer</p>
      </footer>
    </div>
  )
}
