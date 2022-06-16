import { useState } from "react";
import Pages from './Pages'

export default function Home() {
  // Product = useSelector(state => stete.Product)

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
  return(  
    <h1>Home</h1> 
  )
}