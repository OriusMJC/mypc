import { useEffect} from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { delProductCart } from "src/redux/actions"
import s from './Styles/Cart.module.css'
// import ProductsCards from "./ProductsCards"

export default function Cart(){
  const dispatch = useAppDispatch()
  const user = useSelector((store:any)=> store.userDetails)
  const productsCart = useSelector((store:any)=> store.cart)
  function handleKickCart(id){
    dispatch(delProductCart(id))
  }
  useEffect(()=>{
  },[productsCart])
  return (
      <div>
        <section>
          {
            productsCart.length?
            productsCart.map((prod)=>
                <div key={prod.key}>
                  <Link to={`detail/${prod.id}`}>
                      <h2>{prod.title}</h2>
                      <img src={prod.photo} ></img>
                      <h3>Price: ${prod.price}</h3>
                      <h4>Likes: {prod.likes}</h4>
                      <h4>Status: {prod.status}</h4>
                  </Link>
                  <button onClick={()=>{handleKickCart(prod.id)}}>
                      ❌
                  </button>
                </div>
            ) 
            :
            <h1>Aún no has agregado nada al carrito!</h1>
          }
        </section>
        <section>
            <button>
              {
                user.id?
                  <Link to='/buy'>
                    Comprar
                  </Link>
                  :
                  <Link to='/user/login'>
                    Comprar
                  </Link>
              }
            </button>
        </section>
        <button>
          <Link to='/'>Seguir comprando</Link>
        </button>
      </div>
  )
}