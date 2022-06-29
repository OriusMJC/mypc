import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllComponents } from '../../redux/actions/index'
import { useAppDispatch } from '../../config/config'
import s from "../Styles/Fav.module.css";
function UserProducts() {
  const dispatch = useAppDispatch();
  const products = useSelector((state:any) => state.allComponents);
  const user = useSelector((state:any) => state.userDetails);
  let productsCreated = [];

  products.map((prod:any) =>{
    if(prod.sellerInfo.id?.includes(user.id)){
      productsCreated.push(prod)
    }
    })

  useEffect(() => {
    dispatch(getAllComponents())
  }, []);

  function handleDelete(e){
    dispatch(deleteProduct(e.target.value));
    dispatch(getAllComponents());
  }

  return (
    <div className={s.favContainer}>
      <h1 className={s.textInfo} > Productos en VENTA</h1>
      <Link to ='/userdetail'>
        <button className={s.back}>
          Go Back
        </button>
      </Link>
      {
        !productsCreated.length 
        ?
        <p className={s.textInfo}>No hay productos creados</p>
        :
        productsCreated?.map(prod => {
          return (
            <div  className={s.prodFav}>
             <div className={s.containerProduct}>             
              <img src={prod.photo} alt={prod.title} className={s.imgProdFav}></img>
                <div className={s.infoProduct}>
                  <h2>{prod.title}</h2>
                  <h3>{prod.price}</h3>
                  <h3>{prod.type}</h3>
                  <h4>{prod.status}</h4>
                  <p>{prod.description}</p>
                </div>
               <div className={s.btnUserProd}>
                <button className={s.button} onClick = {handleDelete} value={prod.id}>X</button>
                <Link to ={`/user/userEditProduct/${prod.id}`}>
                <button className={s.button}>EDIT</button>
                </Link>
               </div>
             </div>
            </div>
          )
        })

      }
    </div>
  )
}

export default UserProducts;