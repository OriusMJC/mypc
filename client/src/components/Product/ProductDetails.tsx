import { useEffect, useState } from "react"
import { useSelector} from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { addFavUser, addProductCart, getAllDetails, resetProductDetail, deleteProduct } from "src/redux/actions"
import ProductComments from "./ProductComments"
import s from '../Styles/ProductDetails.module.css'
import nolike from '../icons/nolike.png'
import { addCartLH } from "src/services/functionsServices"
import { userInfo } from "os"
import { userData } from "src/services/userFirebase"
// import { Products } from "types"

// interface Info {
//    comment: {
//        name: string,
//        avatar: string,
//        comment: string
//    }
//    seller: {
//        id: any,
//        name: string,
//        email: string,
//        avatar: string,
//    }
// }
export default function ProductDetails(){
   const dispatch = useAppDispatch()
   const {idProduct} = useParams()
   const navigate = useNavigate();
   let product = useSelector((state:any) => state.productDetails)
   const idUser = useSelector((store:any)=> store.userDetails?.id)
   const admin = useSelector((store:any)=> store.userDetails?.admin)
   const productSellerId = product.sellerInfo && product.sellerInfo.id
   const boolean = productSellerId && productSellerId === idUser && true 
   console.log(admin)
   function handleFav(){
      if(idUser){
          dispatch(addFavUser(idUser,{
            key: product.key, 
            id: product.id,
            title: product.title, 
            photo: product.photo, 
            price: product.price, 
            type: product.type, 
            likes: product.likes, 
            status: product.status
         }))
      }else{
          alert('Debes iniciar sesión para poder agregar productos a favoritos!')
      }
  }

   function handleCart(){
      dispatch(addProductCart({
         key: product.key, 
         id: product.id,
         title: product.title, 
         photo: product.photo, 
         price: product.price, 
         type: product.type, 
         likes: product.likes, 
         status: product.status
      }))
   }

   function handleDelete(){
      dispatch(deleteProduct(idProduct))
      alert('Product deleted')
      navigate('/')
   }

   useEffect(():any=>{
      dispatch(getAllDetails(idProduct))
       return () => dispatch(resetProductDetail())
   },[dispatch,idProduct])
   return(
      <div id={s.prodContainer}>
         <div key={product?.key} id={s.contProdDetails}>
            <h1>{product?.title}</h1>
            <section id={s.sectionDetail}>
               <div id={s.detailsImage}>
                  <img src={product?.photo} alt={product?.title}></img>   
               </div>
               <div id={s.detailsData}>
                  <button onClick={handleFav} id={s.buttonFav}>
                     <img src={nolike}/>
                  </button>
                  <h3>Precio: ${product?.price}</h3>
                  <h4>Estado: {product?.status}</h4>
                  <h4>Likes: {product?.likes}</h4>
                  <p>Stock: {product?.cant}</p>
                  <button id={s.buttonBuy}>
                     Comprar
                  </button>
                  <button className={s.btnSend} onClick={handleCart}>
                     Añadir al carrito
                  </button>
                  {
                  (boolean || admin)
                  &&  
                  <>
                  <Link to ={`/user/userEditProduct/${idProduct}`}>
                  <button>
                     Editar
                  </button>
                  </Link>
                  <button onClick = {handleDelete}>
                     Eliminar
                  </button>
                  </> 
                  }
               </div>
            </section>
            <section>
               <h3>Description:</h3>
               <p>
                  {product?.description}
               </p>
               <ProductComments idProd={product.id} comments={product.comments} boolean = {boolean} idProduct={idProduct}/>    
            </section>
         </div>
      </div>
   )
}