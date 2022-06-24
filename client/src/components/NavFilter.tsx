import { useSelector } from "react-redux";
import {filterComponentsByCategory, orderComponentsByPrice, filterComponentsByState, orderComponentsByPopulation} from '../redux/actions';
import NavBar from "./NavBar/NavBar";
import { useAppDispatch  } from '../config/config';
// import { Link } from "react-router-dom";
// import NavButtons from "./NavBar/NavButtons";
import s from './Styles/NavFilter.module.css'
// import * as types from '../../types'

export default function NavFilter({refresh,setRefresh,setProductsPerPage}){
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
        <nav className={s.navFilter}>
            {/* <div className={s.navContainer}>
                <div className={s.logo}></div>
                <div className={s.searchBar}>
                    <NavBar/>
                </div>
                <div className={s.dynamicButtons}></div>
            </div> */}
            
            {/* <Searchbar/>
            <NavButtons/> */}
            <section className={s.filterContent}>
                <div>
                    <label>Productos</label>
                    <select onChange={e => setProductsPerPage(+e.target.value)} className = {s.filters}>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                    </select>
                </div>
                <div>
                    <label>Precio</label>
                    <select onChange={e => handleOrderPrice(e)} className = {s.filters}>
                        <option value="All">All</option>
                        <option value="More price">More price</option>
                        <option value="Lower price">Lower price</option>
                    </select>
                </div>
                <div>
                    <label>Popularidad</label>
                    <select onChange ={e => handleOrderPopularity(e)} className = {s.filters}>
                        <option value = "All">All</option>
                        <option value="More Popularity">More Popularity</option>
                        <option value="Lower Popularity">Lower Popularity</option>
                    </select>
                </div>
                <div>
                    <label>Categoria</label>
                    <select onChange = {e => handleFilter(e)} className = {s.filters}>
                    {types && types.map(t => (
                        <option value ={t}>{t}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label>Estado</label>
                    <select onChange={e => handleFilterState(e)} className = {s.filters}> 
                        <option value="All">All</option>
                        <option value="nuevo">New</option>
                        <option value="usado">Used</option>
                    </select>
                </div>
            </section>
        </nav>
    )
}