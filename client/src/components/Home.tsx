import { useState, useEffect } from 'react';
import {useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getAllComponents, filterComponentsByCategory, orderComponentsByPrice, filterComponentsByState, orderComponentsByPopulation} from '../redux/actions';
import { useAppDispatch  } from '../config/config';
import { Products } from '../../types'
// import ProductsCards from './ProductsCards';
import Pages from './Pages';
import Searchbar from './Searchbar';

//seteo de estados
// interface AppState {
//   currentPage: number;
//   productsPerPage: number;
// }

//tipos
type ProductsCards = Products;

export default function Home() {
  const dispatch = useAppDispatch();
  const allComponents = useSelector((state: any) => state.components);
  const types = useSelector((state:any)=> state.types)
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [refresh,setRefresh] = useState(1)
  useEffect(() => {
    dispatch(getAllComponents());
 }, []); 

  
  //filtrado y ordenamiento
  function value(e){
    return e.target.value
  }

  //filtrado 
  function handleFilter (e) {
    dispatch(filterComponentsByCategory(value(e)))
    setRefresh(refresh+1)
  }
  function handleFilterState(e){
    dispatch(filterComponentsByState(value(e)))
    setRefresh(refresh+1)
  }
  
  //Ordenamientos
  function handleOrderPrice(e){
    dispatch(orderComponentsByPrice(value(e)))
    setRefresh(refresh+1)
  }
  function handleOrderPopularity(e){
    dispatch(orderComponentsByPopulation(value(e)))
    setRefresh(refresh+1)
  }
 

  return(  
    <div>
      <h1>Home</h1>
      {/* Busqueda */}
      <Searchbar />
      {/* Ordenamientos*/}
      {/* Ordenamiento por precio */}
      <label>Productos</label>
      <select onChange={e => setProductsPerPage(+e.target.value)}>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
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
            <option value ={t}>{t}</option>
          ))}
        </select>
      </div>
      {/* Fitlrado por status */}
      <label>State</label>
      <select onChange={e => handleFilterState(e)}>
        <option value="All">All</option>
        <option value="nuevo">New</option>
        <option value="usado">Used</option>
      </select>
      {/* Renderizado */}
      {
        <Pages productsPerPage  = {productsPerPage}
        allComponents = {allComponents}
        refresh = {refresh}/>
      }
    </div>
  )
}
