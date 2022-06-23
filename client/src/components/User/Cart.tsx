import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { delProductCart } from "src/redux/actions";
import s from "../Styles/Cart.module.css";
// import ProductsCards from "./ProductsCards"

export default function Cart() {
  const dispatch = useAppDispatch();
  const user = useSelector((store: any) => store.userDetails);
  const productsCart = useSelector((store: any) => store.cart);
  function handleKickCart(id) {
    dispatch(delProductCart(id));
  }
  useEffect(() => {}, [productsCart]);
  return (
    <div className={s.favContainer}>
      <section className={s.section}>
        {productsCart.length ? (
          productsCart.map((prod) => (
            // <div key={prod.key} className = {s.product}>
            //   <Link to={`/detail/${prod.id}`}>
            //     <div className = {s.productDetails}>
            //       <h2>{prod.title}</h2>
            //       <img src={prod.photo} ></img>
            //       <h3>Price: ${prod.price}</h3>
            //       <h4>Likes: {prod.likes}</h4>
            //       <h4>Status: {prod.status}</h4>
            //     </div>
            //   </Link>
            //   <div className = {s.divButton}>
            //   <button onClick={()=>{handleKickCart(prod.id)}}>
            //       ❌
            //   </button>
            //   </div>

            // </div>
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
                {/* <div className={s.buttons}> */}
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
          <h1>Aún no has agregado nada al carrito!</h1>
        )}
      </section>
      <section className={s.sectionButtons}>
        <Link to="/">
          <button className={s.button}>Seguir comprando</button>
        </Link>
          {user.id ? (
            <Link to="/buy">
              <button className={s.button}>Comprar</button>
            </Link>
          ) : (
            <Link to="/user/login">
              <button className={s.button}>Logearse</button>
            </Link>
          )}
      </section>
    </div>
  );
}