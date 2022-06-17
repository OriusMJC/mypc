import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllComponents, filterComponentsByCategory, orderComponentsByPrice, filterComponentsByState, orderComponentsByPopulation} from '../redux/actions';
import { useAppDispatch  } from '../config/config';
import { Products } from '../../types'
import ProductsCards from './ProductsCards';
import Pages from './Pages';
import Searchbar from './Searchbar';

//seteo de estados
interface AppState {
  currentPage: number;
  productsPerPage: number;
}

//tipos
type ProductsCards = Products;

export default function Home() {
  const dispatch = useAppDispatch();
  const allComponents = useSelector((state: any) => state.components);
  console.log(allComponents)

  useEffect(() => {
    dispatch(getAllComponents());
 }, []); 

  //Paginado
  const [currentPage, setCurrentPage] = useState<AppState["currentPage"]>(1);
  const [productsPerPage, setProductsPerPage] = useState<AppState["productsPerPage"]>(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = allComponents && allComponents.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePaginado = Math.ceil(allComponents.length /productsPerPage) 
  if(currentPage !== 1 && currentPage > handlePaginado) {
  setCurrentPage(1)
  }

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
  
  //filtrado y ordenamiento
  function value(e){
    return e.target.value
  }

  //filtrado 
  const types = [];
  allComponents.forEach(c => {
    !types.includes(c.types) && types.push(c.types)
  })
  function handleFilter (e) {
    dispatch(filterComponentsByCategory(value(e)))
  }
  function handleFilterState(e){
    dispatch(filterComponentsByState(value(e)))
  }

  //Ordenamientos
  function handleOrderPrice(e){
    dispatch(orderComponentsByPrice(value(e)))
  }
  function handleOrderPopularity(e){
    dispatch(orderComponentsByPopulation(value(e)))
  }
 

  return(  
    <div>
      <h1>Home</h1>
      {/* Paginado */}
      <Pages 
      productsPerPage  = {productsPerPage}
      allComponents = {allComponents.length}
      paginado = {paginado}
      />
      {/* Busqueda */}
      <Searchbar />
      {/* Ordenamientos*/}
      {/* Ordenamiento por precio */}
      <label>Price</label>
      <select onChange={e => handleOrderPrice(e)}>
        <option value="All">All</option>
        <option value="More price">More price</option>
        <option value="Lower price">Lower price</option>
      </select>
      {/* Ordenamiento por popularidad */}
      <label>Popularity</label>
      <select onChange ={e => handleOrderPopularity(e)}>
        <option value = "All">All</option>
        <option value="More Popularity">More Popularity</option>
        <option value="Lower Popularity">Lower Popularity</option>
      </select>
      {/* Filtrados */}
      {/* Filtrado por Tipo */}
      <div>
        <select onChange = {e => handleFilter(e)}>
          {types && types.map(t => (
            <option value = {t}>{t}</option>
          ))}
        </select>
      </div>
      {/* Fitlrado por status */}
      <label>State</label>
      <select onChange={e => handleFilterState(e)}>
        <option value="All">All</option>
        <option value="New">New</option>
        <option value="Used">Used</option>
      </select>
      {/* Renderizado */}
      {
        currentProduct && currentProduct.map(prod => {
          return( 
            <ProductsCards
            key = {prod.id}
            title = {prod.title}
            photo = {prod.photo}
            price = {prod.price}
            type = {prod.type}
            description = {prod.description}
            likes = {prod.likes}
            comments = {prod.comments}
            status = {prod.status}
            sellerInfo = {prod.sellerInfo}
            />
          )
        })
      }
    </div>
  )
}
