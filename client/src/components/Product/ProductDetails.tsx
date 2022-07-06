import { useEffect, useState, useCallback } from "react"
import { useSelector} from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { addFavUser, addProductCart, getAllDetails, resetProductDetail, deleteProduct, delFavUser, delProductCart } from "src/redux/actions"
import ProductComments from "./ProductComments"
import SellerProducts from './SellerProducts'
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
   const productSellerId = product.sellerInfo && product.sellerInfo.id
   const boolean = productSellerId && productSellerId === idUser && true
   const [pos, setPos] = useState(0);

   console.log(product.photo)
   
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

   function handlePos(e){
      setPos(e.target.value)
   }
  

   
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
         <SellerProducts/>
         </div>
         <div key={product?.key} id={s.contProdDetails}>
            <h1>{product?.title}</h1>
            <section id={s.sectionDetail}>
            <div className ={s.photoDiv}>
                  {product && product.photo &&
                     product.photo.map((p:any, i) => {
                        const styleImg = {
                           backgroundImage: `url(${p})`,
                           backgroundRepeat: 'no-repeat',
                           backgroundPosition: 'center',
                           backgroundSize: p? 'cover' : 'contain',
                           outlineOffset: p? '-8px' : '0px', 
                       }   
                        return (
                        <div>
                        <button value={i} onClick={handlePos} style={styleImg} className ={s.imgButton}>
                        </button>
                        </div> )
                     })
                  }
               </div>
               <div id={s.detailsImage}>
                  <img src={product && product.photo && product.photo[pos]} alt={product?.title}></img>
               </div>
               <div id={s.detailsData}>
                  <button onClick={handleFav} id={s.buttonFav}>
                     <img src={nolike}/>
                  </button>
                  <h3>Precio: ${product?.price}</h3>
                  <h4>Estado: {product?.status}</h4>
                  <h4>Likes: {product?.likes}</h4>
                  <h4>Categoria: {product?.type}</h4>
                  <p>Stock: {product?.cant}</p>
                  {
                     admin || product.cant === 0?
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
               <div className={s.contDescription}>
                  <h3>Descripción:</h3>
                  <p>
                     {product?.description}
                  </p>
               </div>
               <ProductComments idProd={product.id} comments={product.comments} boolean = {boolean} idProduct={idProduct}/>    
            </section>
         </div>
      </div>
   )
}