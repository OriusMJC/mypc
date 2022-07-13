import { useSelector } from "react-redux";
import {orderComponentsByPrice, filterComponentsByState, orderComponentsByPopulation} from '../redux/actions';
import { useAppDispatch  } from '../config/config';
// import { Link } from "react-router-dom";
// import NavButtons from "./NavBar/NavButtons";
import s from './Styles/NavFilter.module.css';
import Types from './Types';
// import * as types from '../../types'

export default function NavFilter({refresh,setRefresh,setProductsPerPage,products,lengthAll}){
    const dispatch = useAppDispatch();
    const types = useSelector((state:any)=> state.types)
    const spanish = useSelector((state: any) => state.spanish);

     //filtrado y ordenamiento
    function value(e){
        return e.target.value
    }

    //filtrado 
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
            <section className={s.filterContent}>
                <div className = {s.types}>
                    {/* <label>{spanish ? "Categoria " : "Category "}</label>
                    <select onChange = {e => handleFilter(e)} className = {s.filters}>
                        <option value = "All" key="All">{spanish ? "Todo" : "All"}</option>
                        {types && types.map(t => (
                            <option value ={t} key={t}>{t}</option>
                        ))}
                    </select> */}
                    <Types
                    types = {types}
                    spanish = {spanish}
                    refresh = {refresh}
                    setRefresh = {setRefresh}   
                    />
                </div>
                <div className = {s.container2}>
                {
                    products?
                    <div className = {s.selectDivs}>
                        <select onChange={e => setProductsPerPage(+e.target.value)} className = {s.filters}>
                            <option hidden>{spanish ? "Productos " : "Products "}</option>
                            <option value="12" key="12">12</option>
                            <option value="24" key="24">24</option>
                            <option value="48" key="48">48</option>
                            <option value={lengthAll} key="All">{spanish ? "Todos" : "All"}</option>
                        </select>
                    </div>
                    :
                    <></>
                }
                <div className = {s.selectDivs}>
                    <select onChange={e => handleOrderPrice(e)} className = {s.filters}>
                        <option hidden>{spanish ? "Precio " : "Price "}</option>
                        <option value="All" key="All">{spanish ? "Todo" : "All"}</option>
                        <option value="More price" key="More price">{spanish ? "Mayor precio" : "Higher price"}</option>
                        <option value="Lower price" key="Lower price">{spanish ? "Menor precio" : "Lower price"}</option>
                    </select>
                </div>
                <div className = {s.selectDivs}>
                    <select onChange ={e => handleOrderPopularity(e)} className = {s.filters}>
                        <option hidden>{spanish ? "Popularidad " : "Popularity "}</option>
                        <option value = "All" key="All">{spanish ? "Todos" : "All"}</option>
                        <option value="More Popularity" key="More Popularity">{spanish ? "Mayor popularidad" : "Most popular"}</option>
                        <option value="Lower Popularity" key="Lower Popularity">{spanish ? "Menor popularidad" : "Less popular"}</option>
                    </select>
                </div>
                <div className = {s.selectDivs}>
                    <select onChange={e => handleFilterState(e)} className = {s.filters}> 
                        <option hidden>{spanish ? "Estado " : "State "}</option>
                        <option value="All" key="All">{spanish ? "Todo" : "All"}</option>
                        <option value="nuevo" key="nuevo">{spanish ? "Nuevo" : "New"}</option>
                        <option value="usado" key="usado">{spanish ? "Usado" : "Used"}</option>
                    </select>
                </div>
                </div>
            </section>
        </nav>
    )
}