import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllComponents } from '../../redux/actions/index'
import { useAppDispatch } from '../../config/config'
import s from "../Styles/UserProducts.module.css";
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
    <div className={s.container}>
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
            <div  className={s.card}>
              <div className={s.imgSection}>
              <img src={prod.photo} alt={prod.title} ></img>
              <div className={s.infoProd}>
                  <h2>{prod.title}</h2>
                  <p>{prod.price}</p>
                  <p>{prod.type}</p>
              </div>
              </div>
              <div className={s.btnSection}>
                  <h4>{prod.status}</h4>
                <div className={s.btnUserProd}>
                  <button className={s.btn} onClick = {handleDelete} value={prod.id}>X</button>
                  <Link to ={`/user/userEditProduct/${prod.id}`}>
                  <button className={s.btn}>EDIT</button>
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