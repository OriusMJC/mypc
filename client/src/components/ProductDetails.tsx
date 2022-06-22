import { useEffect, useState } from "react"
import { useSelector} from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { addProductCart, getAllDetails } from "src/redux/actions"
import NavButtons from "./NavButtons"
import ProductComments from "./ProductComments"
import Searchbar from "./Searchbar"
// import { Products } from "types"

interface Info {
   comment: {
       name: string,
       avatar: string,
       comment: string
   }
   seller: {
       id: any,
       name: string,
       email: string,
       avatar: string,
   }
}
export default function ProductDetails(){
   const dispatch = useAppDispatch()
   const {idProduct} = useParams()
   let product = useSelector((state:any) => state.productDetails)
   

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

   useEffect(():any=>{
      dispatch(getAllDetails(idProduct))
      // return (
      //    product = {}
      // )
   },[dispatch,idProduct])
   return(
      <div>
         <div key={product?.key}>
            <section>
               <div>
                  <h2>{product?.title}</h2>
                  <img src={product?.photo} alt={product?.title}></img>   
               </div>
               <div>
                  <h3>Precio: ${product?.price}</h3>
                  <h4>Estado: {product?.status}</h4>
                  <p>Cantidad: ${product?.cant}</p>
                  <button onClick={handleCart}>
                     Añadir al carrito
                  </button>
               </div>
            </section>
            <section>
               <h4>Likes: {product?.likes}</h4>
               <p>Description: {product?.description}</p>
               <ProductComments idProd={product.id} comments={product.comments}/>    
            </section>
            {/* {product?.sellerInfo.length && product?.sellerInfo.map((s: Info["seller"]) => {
               <ul>
                  <li>
                        Name: {s.name}
                  </li>
                  <li>
                        Email: {s.email}
                  </li>
                  <li>
                        Avatar: {s.avatar}
                  </li>
               </ul>
            })} */}
         </div>
      </div>
   )
}