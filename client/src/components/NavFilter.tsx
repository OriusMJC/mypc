import { useSelector } from "react-redux";
import {filterComponentsByCategory, orderComponentsByPrice, filterComponentsByState, orderComponentsByPopulation} from '../redux/actions';
import Searchbar from "./Searchbar";
import { useAppDispatch  } from '../config/config';
// import { Link } from "react-router-dom";
import s from './Styles/Nav.module.css'

// import * as types from '../../types'

export default function Nav({refresh,setRefresh,setProductsPerPage}){
    const dispatch = useAppDispatch();
    const types = useSelector((state:any)=> state.types)

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
    return (
        <nav className={s.navContainer}>
            <section className={s.filterContent}>
                <div>
                    <label>Productos</label>
                    <select onChange={e => setProductsPerPage(+e.target.value)}>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                    </select>
                </div>
                <div>
                    <label>Precio</label>
                    <select onChange={e => handleOrderPrice(e)}>
                        <option value="All">All</option>
                        <option value="More price">More price</option>
                        <option value="Lower price">Lower price</option>
                    </select>
                </div>
                <div>
                    <label>Popularidad</label>
                    <select onChange ={e => handleOrderPopularity(e)}>
                        <option value = "All">All</option>
                        <option value="More Popularity">More Popularity</option>
                        <option value="Lower Popularity">Lower Popularity</option>
                    </select>
                </div>
                <div>
                    <label>Categoria</label>
                    <select onChange = {e => handleFilter(e)}>
                    {types && types.map(t => (
                        <option value ={t}>{t}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label>Estado</label>
                    <select onChange={e => handleFilterState(e)}>
                        <option value="All">All</option>
                        <option value="nuevo">New</option>
                        <option value="usado">Used</option>
                    </select>
                </div>
            </section>
        </nav>
    )
}