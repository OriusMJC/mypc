import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { addFavUser, addProductCart } from "src/redux/actions";
import { addCartLH } from "src/services/functionsServices";
import s from "../Styles/ProductsCards.module.css";


export default function ProductCard({id,title, photo, price, type, likes, status, cant}){
  const dispatch = useAppDispatch()
    const idUser = useSelector((store:any)=> store.userDetails?.id)
    function handleFav(){
        if(idUser){
            dispatch(addFavUser(idUser,{id,title, photo, price, type, likes, status}))
        }else{
            alert('Debes iniciar sesión para poder agregar productos a favoritos!')
        }
    }

    function handleCart(){
        dispatch(addProductCart({id,title, photo, price, type, likes, status, cant}))
    }

  return (
    <div key={id} className={s.productCards}>
      <h3 className={s.status}>{status}</h3>
      <h2>{title}</h2>
      <Link to={`detail/${id}`}>
        <img src={photo} alt="Image Product" />
      </Link>
      <div className={s.cardInfo}>
        <h3>${price}</h3>
        <h4>Likes: {likes}</h4>
      </div>
      <button onClick={handleFav}>
        <i className="fa-solid fa-heart"></i>
      </button>
      <button onClick={handleCart}>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
}
