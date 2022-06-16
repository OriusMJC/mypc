import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllComponents} from '../redux/actions';
import { Products, PcTypes } from '../../types';
import { useAppDispatch  } from '../config/config';
import Pages from './Pages'

// type Components = {
//     c: string | number | PcTypes
// }

export default function Home() {
  // Product = useSelector(state => stete.Product)
  const dispatch = useAppDispatch();
  const allComponents = useSelector((state: any) => state.components);
  const Product = []
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setPrductsPerPage] = useState(20); 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = Product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
   );
  const handlePaginado = Math.ceil(Product.length /productsPerPage) 
if(currentPage !== 1 && currentPage > handlePaginado) {
  setCurrentPage(1)
}
  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
    
  useEffect(() => {
     dispatch(getAllComponents());
  }, [dispatch]); 

  
  return(  
    <h1>Home</h1> 
  )
}
