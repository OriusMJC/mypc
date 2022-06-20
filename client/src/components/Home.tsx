import { useState, useEffect } from 'react';
import {useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getAllComponents} from '../redux/actions';
import { useAppDispatch  } from '../config/config';
// import { Products } from '../../types'
// import ProductsCards from './ProductsCards';
import Pages from './Pages';
import Nav from './Nav';

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
      <h1>MyPC</h1>
      <Nav refresh={refresh} setRefresh={setRefresh} setProductsPerPage={setProductsPerPage}/>
      {
        <Pages productsPerPage  = {productsPerPage}
        allComponents = {allComponents}
        refresh = {refresh}/>
      }
      <footer>
        <p>Soy el footer</p>
      </footer>
    </div>
  )
}
