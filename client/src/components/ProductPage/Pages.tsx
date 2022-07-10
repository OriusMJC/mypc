import { useState, useEffect } from "react";
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from "../Loading/Loading";
import ProductCard from "../reusable/ProductCard";
import { getAllComponents} from '../../redux/actions'
import { useAppDispatch} from '../../config/config'
import s from "../Styles/Pages.module.css";
import './style.css'
import swal from 'sweetalert';
import { changeActualPage } from "src/redux/actions";


function Pages({ productsPerPage, allComponents, refresh }) {
    const dispatch = useAppDispatch();
    const spanish = useSelector((state: any) => state.spanish);

    useEffect(() => {
        dispatch(getAllComponents())
    }, [])

    const cantPages = Math.ceil(allComponents.length /productsPerPage) 
    const actualPage = useSelector((state:any)=> state.actualPage)
    const [currentPage, setCurrentPage] = useState(actualPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProduct = allComponents?.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    
    if(typeof allComponents[0] !== 'string'){
        for (let i = 1; i <= cantPages; i++){
            pageNumbers.push(
                <button key={i} value={i} onClick={()=>{setCurrentPage(i); dispatch(changeActualPage(i))}} className={i===currentPage? s.buttonActive : null}>
                    {i}
                </button>)
        }
    }
    if(currentPage !== 1 && currentPage > cantPages) {
        setCurrentPage(1)
        dispatch(changeActualPage(1))
    }

    const products = useSelector((state:any) => state.allComponents)
    const user = useSelector((state:any) => state.userDetails)

    return(
      <section className={s.pageContainer}>
          <div className={s.buttonsPage}>
              {pageNumbers}
          </div>
          <div className={s.containerProdCards}>
          {
              !products.length ? 
              
            //   <div className = {s.containerHome}>
            //   <h2>Aun no hay productos cargados!</h2>
            //   {
            //     user && user.id? 
            //     <Link to='/user/createProduct'>
            //         <button className = {s.buttonHomeCreate}>Crear producto</button>
            //     </Link> :
            //     <h2>Logueate para crear uno!</h2>
            //   }
              
            //   </div> 
             
           
            <Loading load={spanish ? 'Cargando productos' : "Loading products"} msgError={spanish ? "No hay ningún producto cargado... Logueate para crear uno!" : "There are no loaded products... Login to create one!"} time={3000}/>                        
              :            
              refresh && currentProduct.length?
              typeof allComponents[0] !== 'string'?
                  currentProduct.map(prod=>{
                      return( 
                      <ProductCard 
                          key={prod && prod.id} 
                          id={prod && prod.id} 
                          title={prod && prod.title} 
                          photo={prod && prod.photo}
                          price={prod && prod.price} 
                          type = {prod.type}
                          likes = {prod.likes}
                          status = {prod.status}
                          cant={prod.cant}
                          sellerInfo={{id: prod.sellerInfo.id,email: prod.sellerInfo.email}}
                          />)
                  })
                  :
                  <h2>{allComponents}</h2>

              :
                          
              // <Loading/>
              <Loading load={spanish ? 'Buscando producto' : "Searching product"} msgError={spanish ? 'No se ha encontrado ningún producto' : "No product found"} time={3000}/>
          }      
          </div>
      </section>
      
  )
}

export default Pages;


