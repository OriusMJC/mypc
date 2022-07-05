import { useState } from "react";
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from "../Loading/Loading";
import ProductCard from "../reusable/ProductCard";
import s from "../Styles/Pages.module.css";
import './style.css'
import swal from 'sweetalert';


function Pages({ productsPerPage, allComponents, refresh }) {

    

    const cantPages = Math.ceil(allComponents.length /productsPerPage) 
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProduct = allComponents?.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    
    if(typeof allComponents[0] !== 'string'){
        for (let i = 1; i <= cantPages; i++){
            pageNumbers.push(
                <button key={i} value={i} onClick={()=>{setCurrentPage(i)}} className={i===currentPage? s.buttonActive : null}>
                    {i}
                </button>)
        }
    }
    if(currentPage !== 1 && currentPage > cantPages) {
        setCurrentPage(1)
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
             
           
            <Loading load='Cargando productos' msgError='No hay ningún producto cargado... Logueate para crear uno!' time={3000}/>                        
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
                          />)
                  })
                  :
                  <h2>{allComponents}</h2>

              :
                          
              // <Loading/>
              <Loading load='Buscando producto' msgError='No se a encontrado ningun producto' time={3000}/>
          }      
          </div>
      </section>
      
  )
}

export default Pages;


