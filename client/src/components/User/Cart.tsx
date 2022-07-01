import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { delProductCart, getProductsLHtoCart } from "src/redux/actions";
import s from "../Styles/Cart.module.css";
// import ProductsCards from "./ProductsCards"

export default function Cart() {
  const dispatch = useAppDispatch();
  const [listPrice,setListPrice] = useState([])
  const user = useSelector((store: any) => store.userDetails);
  const [precioTotal,setPrecioTotal] = useState(0)
  let products = true;
  let productsCart = useSelector((store: any) => store.cart);
  let idsArr = []
  productsCart = productsCart.filter((prod:any)=>{
    if(!idsArr.includes(prod.id)){
      idsArr.push(prod.id)
      return prod
    }
  })
  
  function handlePrice(e:any){
    let list = []
    let price = 0
    listPrice.map((p:any)=>{
      if(p.id === e.target.id){
        if(p.cant < e.target.value){
          console.log('entro')
          list.push({id:p.id,total: p.total + Number(e.target.name), cant: p.cant + 1})
          price = price + p.total + Number(e.target.name)
        }else if(p.cant > e.target.value){
          list.push({id:p.id,total: p.total - Number(e.target.name), cant: p.cant - 1})
          price = price + p.total - Number(e.target.name)
        }else{
          list.push(p)
          price = price + p.total
        }
      }else{
        list.push(p)
        price = price + p.total
      }
    })
    setListPrice(list)
    setPrecioTotal(price)
  }
  function handleDeletePrice(id){
    let list = []
    let price = 0
    listPrice.map((p:any)=>{
      if(p.id !== id){
        list.push(p)
        price = price + p.total
      }
    })
    setListPrice(list)
    setPrecioTotal(price)
  }
  function getPrice(){
    let list = []
    let price = 0
    productsCart.forEach((p:any)=>{
          list.push({id:p.id,total: p.price, cant: 1})
          price = price + p.price
      })
    setListPrice(list)
    setPrecioTotal(price)
  }

  function handleKickCart(id) {
    dispatch(delProductCart(id));
    handleDeletePrice(id);
  }
  useEffect(() => {
    dispatch(getProductsLHtoCart());
  }, []);
  useEffect(() => {
    getPrice();
  }, [user,dispatch]);
  return (
    <div className={s.favContainer}>
      <section className={s.section}>
        {productsCart.length ? (
          productsCart.map((prod) => (
            <div key={prod.key} className={s.prodFav}>
              <div className={s.containerProduct}>
                <Link to={`/detail/${prod.id}`}>
                  <div className={s.imgProdFav}>
                    <img src={prod.photo} alt="" />
                  </div>
                </Link>
                <div className={s.infoProduct}>
                  <Link to={`/detail/${prod.id}`}>
                    <h2>{prod.title}</h2>
                  </Link>
                  <div className={s.infoDetailsProduct}>
                    <h3>Price: ${prod.price}</h3>
                    <h4>Likes: {prod.likes}</h4>
                  </div>
                </div>
              </div>
              <div className={s.extra}>
                <h4>{prod.status}</h4>
                <input placeholder="1" id={prod.id} name={prod.price} type='number' min={1} max={Number(prod.cant)} onChange={handlePrice}/>
                <button
                  className={s.button}
                  onClick={() => {
                    handleKickCart(prod.id);
                  }}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
                {/* </div> */}
              </div>
            </div>
          ))
        ) : (
          <div>
          <h1>Aún no has agregado nada al carrito!</h1>
          {products = false}
          </div>
        )}
      </section>
      <section className={s.sectionButtons}>
        <b>Total: ${precioTotal}</b>
        <b>IVA incluido.</b>
        <Link to="/">
          <button className={s.button}>Seguir comprando</button>
        </Link>
          {user && products === true ? user.id ? (
            <Link to="/buy">
              <button className={s.button}>Comprar</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className={s.button}>Logearse</button>
            </Link>
          ) : null}
      </section>
    </div>
  );
}
