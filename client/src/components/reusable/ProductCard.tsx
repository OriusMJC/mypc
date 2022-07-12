import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { addFavUser, addProductCart, delFavUser, addVisited} from "src/redux/actions";
import { addCartLH } from "src/services/functionsServices";
import s from "../Styles/ProductsCards.module.css";
import swal from 'sweetalert';
import { useCallback, useEffect, useState } from "react";

export default function ProductCard({id,title, photo, price, type, likes, status, cant, seller}){
    const dispatch = useAppDispatch()
    const spanish = useSelector((state: any) => state.spanish);
    const user = useSelector((store:any)=> store.userDetails)
    const allProducts = useSelector((store:any)=> store.allComponents)
    let [favClicks,setFavCliks] = useState(0)
  
  function handleFav(){
        if(user){
          dispatch(addFavUser(user?.id,{id,title, photo, price, type, likes, status, seller}))
          setFavCliks(favClicks + 1)        
        }else{
          swal({
            title: spanish ? "No estas logueado" : "You are not logged",
            text: spanish ? "Debes iniciar sesión para poder agregar productos a favoritos!" : "You must be logged in to add products to favorites!",
            icon: "warning",
          })
            // alert('Debes iniciar sesión para poder agregar productos a favoritos!')
        }
      }    
    function handleCart(){
        dispatch(addProductCart({id,title, photo, price, type, likes, status, cant, seller}))
    }
    function handleDelet(){
      dispatch(delFavUser(user?.id, id));
      setFavCliks(0)
    }
    
    useEffect(() => {
      user.fav?.map((c:any) =>{
        if(c.id === id){
          setFavCliks(favClicks + 1)
        }
      })
      
    }, [user])

    function handleVisited(e:any){
      if(user.id){
        allProducts.map((prod) => {
          if(prod.id === e.target.value){
            dispatch(addVisited(user.id, prod))
          }
        })
      }
    }

    const styledBut = {
      backgroundImage: `url(${photo && photo[0]})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: photo[0]? 'cover' : 'contain',
      outlineOffset: photo[0]? '-8px' : '0px',
      width:  '200px',
      height: '150px',
      transition: '.2s',
    }
    
  return (
    <div key={id} className={s.productCards}>
      <h3 className={s.status}>{status}</h3>
      <h2 >{title}</h2>
      <Link to={`detail/${id}`}>
        <button value = {id} onClick = {handleVisited} style = {styledBut} className = {s.imgButton}>
        </button>
      </Link>
      <div className={s.cardInfo}>
        <h3>${price}</h3>
        <h4>Likes: {likes}</h4>
      </div>
      {
        user?.id && favClicks
        ?
        <button onClick={handleDelet}>
        <i className="fa-solid fa-heart"></i>
      </button>
       :
       <button onClick={handleFav}>
       <i className="fa fa-heart-o"></i>
     </button>
      }
      <button onClick={handleCart}>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
}
