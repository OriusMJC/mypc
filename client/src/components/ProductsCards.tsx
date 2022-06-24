import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useAppDispatch } from 'src/config/config'
import { addFavUser, addProductCart } from 'src/redux/actions'
import s from './Styles/ProductsCards.module.css'


export default function ProductsCards({key, id,title, photo, price, type, likes, status}){
    const dispatch = useAppDispatch()
    const idUser = useSelector((store:any)=> store.userDetails?.id)
    console.log(photo)
    function handleFav(){
        if(idUser){
            dispatch(addFavUser(idUser,{key, id,title, photo, price, type, likes, status}))
        }else{
            alert('Debes iniciar sesión para poder agregar productos a favoritos!')
        }
    }

    function handleCart(){
        dispatch(addProductCart({key, id,title, photo, price, type, likes, status}))
    }


    return  (
        <div key={key} className={s.productCards}>
            <h2>{title}</h2>
            <Link to={`detail/${id}`}>
                <img src={photo} alt='Image Product'/>
            </Link>
            <div className = {s.cardInfo}>
                <h3>${price}</h3>
                <h3>Status: {status}</h3>
                <h4>Likes: {likes}</h4>
            </div>
            <button onClick={handleFav}>
                ❤
            </button>
            <button onClick={handleCart}>
                🦽
            </button>
        </div>
    )
}