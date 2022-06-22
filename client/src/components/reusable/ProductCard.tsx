import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useAppDispatch } from 'src/config/config'
import { addFavUser, addProductCart } from 'src/redux/actions'
import s from '../Styles/ProductsCards.module.css'


export default function ProductCard({key, id,title, photo, price, type, likes, status}){
    const dispatch = useAppDispatch()
    const idUser = useSelector((store:any)=> store.userDetails.id)
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
            <Link to={`detail/${id}`}>
                <h2>{title}</h2>
                <div className={s.cardImageCont}>
                    <img src={photo} alt='Image Product'/>
                </div>
                <div>
                    <h3>Price: ${price}</h3>
                    <h3>Status: {status}</h3>
                </div>
                <h4>Likes: {likes}</h4>
            </Link>
            <button onClick={handleFav}>
                ❤
            </button>
            <button onClick={handleCart}>
                🦽
            </button>
        </div>
    )
}