import { useEffect, useState, useCallback } from "react"
import { useSelector} from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { addFavUser, addProductCart, getAllDetails, resetProductDetail, deleteProduct, delFavUser, delProductCart } from "src/redux/actions"
import ProductComments from "./ProductComments"
import s from '../Styles/ProductDetails.module.css'
import nolike from '../icons/nolike.png'
import { addCartLH } from "src/services/functionsServices"
import { userInfo } from "os"
import { userData } from "src/services/userFirebase"
import swal from 'sweetalert';

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
   const components = useSelector((store:any) => store.allComponents)
   const productSellerId = product.sellerInfo && product.sellerInfo.id
   const boolean = productSellerId && productSellerId === idUser && true
   const sProducts = components.filter((p) => p.sellerInfo.id === idUser)

   let random1 = Math.floor(Math.random()*(sProducts.length ? sProducts.length : 1))
   let random2 = Math.floor(Math.random()*10)
   let actualComponents = [];
   if(random1 > random2) actualComponents = components.slice(random2, random1);
   else if(random2 > random1) actualComponents = components.slice(random1, random2);
   else actualComponents = components.slice(random1, random2 + 1)
   
   const sellerProducts = actualComponents.filter((p:any) => p.sellerInfo.id === idUser).slice(0, 3)
   
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
         swal({
            title: "No estas Logueado",
            text: "Debes iniciar sesión para agregar productos a favoritos",
            icon: "warning",
          });  
         //  alert('Debes iniciar sesión para poder agregar productos a favoritos!')
      }
  }

   function handleCart(){
      if(boolean){
         swal({
            title: "Cuidado",
            text: "No puedes agregar tus productos al carrito!",
            icon: "warning",
         })
      }else{
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
   }
   async function handleBuy(){
      if(boolean){
         swal({
            title: "Cuidado",
            text: "No puedes comprar tus productos!",
            icon: "warning",
         })
      }else{
         await dispatch(addProductCart({
            key: product.key, 
            id: product.id,
            title: product.title, 
            photo: product.photo, 
            price: product.price, 
            type: product.type, 
            likes: product.likes, 
            status: product.status
         }))
         navigate('/cart')
      }
      
      
   }

   // function handleDelete(){
   //    swal({         
   //       text: "Estas seguro de eliminar el producto?",
   //       icon: "warning",
   //       buttons: ["No", "Si"]
   //     }).then(respuesta =>{
   //       if(respuesta){
   //          swal({text: "Producto eliminado correctamente" , icon: "success"})
   //          dispatch(delFavUser(idUser, idProduct))
   //          dispatch(delFavUser(idUser, idProduct))
   //          dispatch(delFavUser(idUser, idProduct))
   //          dispatch(delFavUser(idUser, idProduct))
   //          dispatch(delProductCart(idProduct))
   //          dispatch(deleteProduct(idProduct))
   //          navigate('/')
   //       }
   //     })  
   //    // alert('Product deleted')
   // }

   const prueba = useCallback(() => {
      swal({         
         text: "Estas seguro de eliminar el producto?",
         icon: "warning",
         buttons: ["No", "Si"]
       }).then(respuesta =>{
         if(respuesta){
            swal({text: "Producto eliminado correctamente" , icon: "success"})
            dispatch(delFavUser(idUser, idProduct))
            dispatch(delProductCart(idProduct))
            dispatch(deleteProduct(idProduct))
            navigate('/')
         }
       })  
   }, [])

   useEffect(():any=>{
      dispatch(getAllDetails(idProduct))
       return () => dispatch(resetProductDetail())
   },[dispatch, idProduct])

   
   return(
      <div id={s.prodContainer}>
         <div>
         {
         product.sellerInfo &&
         <div className = {s.sellerDiv}>
            <div className = {s.imgSellerDiv}>
               <img src={product.sellerInfo.avatar} className = {s.sellerImg}></img>
            </div>
            <div className = {s.sellerData}>
               <label>Vendedor</label>
               <div>
               <h2>{product.sellerInfo.name}</h2>
               <label>Contacto: </label>
               <p>{product.sellerInfo.email} / {product.sellerInfo.phone}</p>
               </div>
            </div>
         </div>
         }
         {
            sellerProducts.length != 0 && 
            <div className = {s.prodContainer}>
               <div className = {s.h2Prod}>
               <h2>Mas productos del vendedor</h2>
               </div>
               {sellerProducts.map((prod:any) => (
                  <div className = {s.prodDetails}>
                     <Link to = {`/detail/${prod.id}`}>
                        <img src={prod.photo} className = {s.prodImg}></img>
                     </Link>
                     <div className = {s.prodD}>
                     <h3>{prod.title}</h3>
                     <h4>${prod.price}</h4>
                     <h5>{prod.status}</h5>
                     </div>
                  </div>
               ))}
            </div>
         }
         </div>
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
                  {
                     admin?
                     <>
                        <input value='Comprar' type='button' id={s.buttonBuy}  onClick={handleBuy} disabled/>
                        <input value='Añadir al carrito'type='button' className={s.btnSend} onClick={handleCart} disabled/>
                     </>
                     :
                     <>
                        <input value='Comprar' type='button' id={s.buttonBuy}  onClick={handleBuy}/>
                        <input value='Añadir al carrito'type='button' className={s.btnSend} onClick={handleCart}/>
                     </>
                  }
                  {
                  (boolean || admin)
                  &&  
                  <>
                     <Link to ={`/user/userEditProduct/${idProduct}`}>
                        <button className={s.btnSend}>
                           Editar
                        </button>
                     </Link>
                     <button onClick = {prueba} className={`${s.btnDelete} ${s.btnSend}`}>
                        Eliminar
                     </button>
                  </> 
                  }
               </div>
            </section>
            <section>
               <h3>Descripción:</h3>
               <p>
                  {product?.description}
               </p>
               <ProductComments idProd={product.id} comments={product.comments} boolean = {boolean} idProduct={idProduct}/>    
            </section>
         </div>
      </div>
   )
}