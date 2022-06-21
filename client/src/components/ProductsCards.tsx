import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useAppDispatch } from 'src/config/config'
import { addFavUser, addProductCart } from 'src/redux/actions'


export default function ProductsCards({key, id,title, photo, price, type, likes, status}){
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
        <div key={key}>
            <Link to={`detail/${id}`}>
                <h2>{title}</h2>
                <img src={photo} ></img>
                <h3>Price: ${price}</h3>
                <h4>Likes: {likes}</h4>
                <h4>Status: {status}</h4>
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