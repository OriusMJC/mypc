import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { addProductCart, delFavUser, loginUser } from "src/redux/actions"
import s from './Styles/Fav.module.css'
// import { userData } from "src/services/userFirebase"
// import ProductsCards from "./ProductsCards"

export default function Fav(){
    const dispatch = useAppDispatch()
    const user = useSelector((store:any)=> store.userDetails)
    // const productsFav = useSelector((store:any)=> store.userDetails?.fav)
    // function HandleNavi(){
    //     const navigate = useNavigate()
    //     navigate('/user/login')
    // }
    function handleKickFav(isUser,idProd){
        dispatch(delFavUser(isUser,idProd))
    }

    function handleCart(key, id,title, photo, price, type, likes, status){
        dispatch(addProductCart({key, id,title, photo, price, type, likes, status}))
    }

    useEffect(()=>{
        if(user.id){
            dispatch(loginUser(user.id))
        }
    },[handleKickFav])
    return (
        <div className={s.favContainer}>
            <Link to={'/'}>
                <button>Inicio</button>
            </Link>
                {
                    user.id?
                        user.fav.length?
                        user.fav.map((prod)=>
                            <div key={prod.key} className={s.prodFav}>
                                {/* <div> */}
                                    <div className={s.imgProdFav}>
                                        <img src={prod.photo} ></img>
                                    </div>
                                    <div>
                                    <Link to={`/detail/${prod.id}`}>
                                        <h2>{prod.title}</h2>
                                    </Link>
                                        <div>
                                            <h3>Price: ${prod.price}</h3>
                                            <h4>Status: {prod.status}</h4>
                                        </div>
                                        <h4>Likes: {prod.likes}</h4>
                                    {/* </div> */}
                                </div>
                                <div>
                                    <button onClick={()=>{handleKickFav(user.id,prod.id)}}>
                                        ❌
                                    </button>
                                    <button onClick={()=>{handleCart(prod.key, prod.id,prod.title, prod.photo, prod.price, prod.type, prod.likes, prod.status)}}>
                                        🦽
                                    </button>
                                </div>
                            </div>
                        ) 
                        :
                        <div>
                            <h1>Aún no has agregado nada a favorito!</h1>
                            <Link to='/'>
                                <button>Volver al Inicio</button>
                            </Link>
                        </div>
                    :
                    <div>
                        <h1>Aún no has iniciado sesión!</h1>
                        <Link to='/user/login'>
                            <button>Login</button>
                        </Link>
                    </div>
                }
        </div>
    )
}