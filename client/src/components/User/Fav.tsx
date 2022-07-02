import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { addProductCart, delFavUser, loginUser } from "src/redux/actions";
import s from "../Styles/Fav.module.css";
// import { userData } from "src/services/userFirebase"
// import ProductsCards from "./ProductsCards"

export default function Fav() {
  const dispatch = useAppDispatch();
  const user = useSelector((store: any) => store.userDetails);

  const prueba = useCallback((idUser, idProd) => {
    dispatch(delFavUser(idUser, idProd));
  }, [])

  function handleCart(key, id, title, photo, price, type, likes, status) {
    dispatch(
      addProductCart({ key, id, title, photo, price, type, likes, status })
    );
  }

  useEffect(() => {
    if (user && user.id) {
      dispatch(loginUser(user.id));
    }
  }, []);

  return (
    <div className={s.favContainer}>
      {user ? (
        user.id ? (
          user.fav.length ? (
            user.fav.map((prod) => 
                (
                  <div key={prod.key} className={s.prodFav}>
                    {/* <div> */}
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
                      <div className={s.buttons}>
                        <button
                          className={s.button}
                          onClick={() => {
                            prueba(user.id, prod.id);
                          }}
                        >
                          <i className="fa-solid fa-x"></i>
                        </button>
                        <button
                          className={s.button}
                          onClick={() => {
                            handleCart(
                              prod.key,
                              prod.id,
                              prod.title,
                              prod.photo,
                              prod.price,
                              prod.type,
                              prod.likes,
                              prod.status
                            );
                          }}
                        >
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )
          ) : (
            <div className={s.textInfo}>
              <h1>Aún no has añadido nada a Favoritos!</h1>
              <Link to="/">
                <button className={s.button}>Volver al Inicio</button>
              </Link>
            </div>
          )
        ) : (
          <div className={s.textInfo}>
            <h1>Aún no has inciado sesión. Inicia sesión para ver tu lista de favoritos!</h1>
            <Link to="/login">
              <button className={s.button}>Login</button>
            </Link>
          </div>
        )
      ) : null}
    </div>
  );
}
