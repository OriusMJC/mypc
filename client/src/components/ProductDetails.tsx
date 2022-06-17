import { useEffect } from "react"
import { useSelector} from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { getAllDetails } from "src/redux/actions"
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
   let product = useSelector((state:any) => state.details)
   useEffect(():any=>{
      dispatch(getAllDetails(idProduct))
      // return (
      //    product = {}
      // )
   },[])
   return(
      <div>
         <Link to='/'>
            <button>Home</button>
         </Link>
         {
            product.id?
            <div key={product.key}>
               <h2>{product.title}</h2>
               <img src={product.photo} ></img>
               <h3>Price: ${product.price}</h3>
               {/* <h3>VER RENDER TIPO</h3> */}
               <p>Description: {product.description}</p>
               <h4>Likes: {product.likes}</h4>
               {product.comments && product.comments.map((c: Info["comment"]) => {
                  <ul>
                     <li>
                           Name: {c.name}
                     </li>
                     <li>
                           {c.avatar}
                     </li>
                     <li>
                           Comments: {c.comment}
                     </li>
                  </ul>
               })}
               <h4>Status: {product.status}</h4>
               {product.sellerInfo.length && product.sellerInfo.map((s: Info["seller"]) => {
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
               })}
            </div>
            :
            <h1>Cargando...</h1>
         }
      </div>
   )
}