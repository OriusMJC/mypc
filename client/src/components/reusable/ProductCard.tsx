import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { addFavUser, addProductCart, delFavUser } from "src/redux/actions";
import { addCartLH } from "src/services/functionsServices";
import s from "../Styles/ProductsCards.module.css";
import swal from 'sweetalert';
import { useCallback, useEffect, useState } from "react";


export default function ProductCard({id,title, photo, price, type, likes, status, cant}){
  const dispatch = useAppDispatch()
    const user = useSelector((store:any)=> store.userDetails)
    const [likesinRed, setlikesinRed] = useState(false)

  let handleFavsClick = []
  user.fav.map((c:any) => handleFavsClick.push(c.id))

    function handleFav(){
        if(user){
            dispatch(addFavUser(user?.id,{id,title, photo, price, type, likes, status}))
            setlikesinRed(true)        
        }else{
          swal({
            title: "No estas Logueado",
            text: "Debes iniciar sesión para poder agregar productos a favoritos!",
            icon: "warning",
          })
            // alert('Debes iniciar sesión para poder agregar productos a favoritos!')
        }
    }    
    function handleCart(){
        dispatch(addProductCart({id,title, photo, price, type, likes, status, cant}))
    }
    function handleDelet(){
      dispatch(delFavUser(user?.id, id));
    }   
    
    // useEffect(() => {
      
    // }, [handleDelet,handleFavsClick])

console.log(handleFavsClick);
  return (
    <div key={id} className={s.productCards}>
      <h3 className={s.status}>{status}</h3>
      <h2 >{title}</h2>
      <Link to={`detail/${id}`}>
        <img src={photo[0]} alt="Image Product" />
      </Link>
      <div className={s.cardInfo}>
        <h3>${price}</h3>
        <h4>Likes: {likes}</h4>
      </div>
      {
        user?.id && handleFavsClick.includes(id)        
        ?
        <button onClick={handleDelet}>
        <i className="fa-solid fa-heart"></i>
      </button>
       :
       <button onClick={handleFav}>
       <i className="fa fa-heart-o"></i>
     </button>
      }
      {/* <button   onClick={handleFav}>
        <i  className="fa-solid fa-heart"></i>        
      </button>  */}
      
      <button onClick={handleCart}>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
}
