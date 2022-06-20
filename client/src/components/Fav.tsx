import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { delFavUser } from "src/redux/actions"
import ProductsCards from "./ProductsCards"

export default function Fav(){
  const dispatch = useAppDispatch()
    const user = useSelector((store:any)=> store.userDetails)
    // const productsFav = useSelector((store:any)=> store.userDetails?.fav)
    function HandleNavi(){
        const navigate = useNavigate()
        navigate('/login')
    }
    function handleKickFav(isUser,idProd){
        dispatch(delFavUser(isUser,idProd))
      }
    return (
        <div>
            {
                user.id?
                    user.fav.length?
                    user.fav.map((prod)=>
                        <div key={prod.key}>
                            <Link to={`detail/${prod.id}`}>
                                <h2>{prod.title}</h2>
                                <img src={prod.photo} ></img>
                                <h3>Price: ${prod.price}</h3>
                                <h4>Likes: {prod.likes}</h4>
                                <h4>Status: {prod.status}</h4>
                            </Link>
                            <button onClick={()=>{handleKickFav(user.id,prod.id)}}>
                                ❌
                            </button>
                        </div>
                    ) 
                    :
                    <h1>Aún no has agregado nada a favorito!</h1>
                :
                HandleNavi()
            }
        </div>
    )
}