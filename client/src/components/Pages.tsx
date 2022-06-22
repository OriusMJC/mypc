import {useState} from 'react'
import ProductsCards from './ProductsCards';
import s from './Styles/Pages.module.css'


function Pages({productsPerPage, allComponents, refresh}) {
     
    const cantPages = Math.ceil(allComponents.length /productsPerPage) 
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProduct = allComponents?.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    
    if(typeof allComponents !== 'string'){
        for (let i = 1; i <= cantPages; i++){
            pageNumbers.push(
                <button value={i} onClick={()=>{setCurrentPage(i)}}>
                    {i}
                </button>)
        }
    }
    if(currentPage !== 1 && currentPage > cantPages) {
        setCurrentPage(1)
    }

    return(
        <section className={s.pageContainer}>
            <div className={s.buttonsPage}>
                {pageNumbers}
            </div>
            <div className={s.containerProdCards}>
            {
                refresh && currentProduct.length?
                typeof allComponents !== 'string'?
                currentProduct.map(prod=>{
                    return(
                    <ProductsCards 
                        key={prod && prod.id} 
                        id={prod && prod.id} 
                        title={prod && prod.title} 
                        photo={prod && prod.photo}
                        price={prod && prod.price} 
                        type = {prod.type}
                        likes = {prod.likes}
                        status = {prod.status}
                        />)
                })
                :
                <h2>{allComponents}</h2>
                :
                // <Loading/>
                <h1>Cargando...</h1>
            }
            </div>
        </section>
        
    )

}

export default Pages;

