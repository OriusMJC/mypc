import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProducts from './UserProducts';
import s from "../Styles/userDetails.module.css";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/config/config";
import { getOrders } from 'src/redux/actions'

export default function UserDetail() {
  const user = useSelector((state: any) => state.userDetails);
  const orders = useSelector((state: any) => state.orders?.reverse());
  let dispatch = useAppDispatch();
  const spanish = useSelector((state: any) => state.spanish);

  useEffect(() => {
    if(user) {
      dispatch(getOrders(user.id))
    }
  }, [user])

  
  return (
    <div className={s.container}>
      {
        user?.id?
        <>
          <div className={s.contOptions}>
            <Link to="/user/detail/edit">
              <button>{spanish ? "Editar perfil" : "Edit profile"}</button>
            </Link>
            <Link to="/user/detail/password">
              <button>{spanish ? "Cambiar contraseña" : "Change password"}</button>
            </Link>
            <Link to="/user/detail/mail">
              <button>{spanish ? "Cambiar email" : "Change email"}</button>
            </Link>
            {/* <button>a</button> */}
          </div>
          <div className={s.userDetails}>
            <div className={s.buttonContainer}>
              <Link to="/">
                <button className={s.buttonButton}>
                  {spanish ? "Inicio" : "To Home"}
                </button>
              </Link>
              {
                user.seller ? (
                  <Link to="/user/direction">
                    <button className={s.buttonButton}>
                      {spanish ? "Dirección" : "Address"}
                    </button>
                  </Link>
                ) : (
                  null
                )
              }
              <Link to = "/user/createProduct">
                <button className={s.buttonButton}>
                  {spanish ? "Vender" : "Sell"}
                </button>
              </Link>
              <Link to ='/user/userProducts'>
                <button className={s.buttonButton}> 
                  {spanish ? "Estadisticas" : "Stats"}
                </button>
              </Link>
              <Link to={`/list/chats/${user.id}`}>
                <button className={s.buttonButton}>
                  Chats
                </button>
              </Link>
              {
                user.admin && user.email === 'mypcecommerce@gmail.com'?
                  <Link to = '/user/admin'>
                    <button className={s.buttonButton}>
                      Admin
                    </button>
                  </Link>
                  :
                  null
              }            
              </div>
              <div className={s.user}>
                <div className={s.userDetails}>
                  <h1>{user && user.name}</h1>
                  <p>Email: {user && user.email}</p>
                  <p>{spanish ? "Contraseña: " : "Password: "}{user && "***" + user.password?.slice(-3)}</p>
                  <p>{spanish ? "Teléfono: " : "Phone: "}{user && user.phone}</p>
                </div>
                <img src={user && user.avatar} alt={user.name} />
              </div>
              <div className={s.userProducts}>
                  <h2>{spanish ? "COMPRADO" : "PURCHASED"}</h2>
                  {orders.length ?
                    orders.reverse().map((c) => {
                      return (
                        <>
                          <hr></hr>
                          <div className={s.orderCard}>
                            <div>
                              <b>{spanish ? "Nro de compra" : "Purchase Number"}</b>
                              <p>{c.id}</p>
                              <h5>{spanish ? "Fecha: " : "Date: "}{c.date? c.date: null}</h5>
                            </div>
                            <div>
                              <h3>{spanish ? "Monto: $" : "Amount: $"} {c.fullPayment}</h3>
                                <Link to={`order/${c.id}`}>
                                  <button>
                                    {spanish ? "VER DETALLES" : "SEE DETAILS"}
                                  </button>
                                </Link>
                            </div>
                          </div>
                        </>
                      );
                    }) 
                    : 
                    <p>{spanish ? "Aún no compraste nada" : "You haven't bought anything yet"}</p>}
              </div>
            </div>
        </>
        :
          <Loading load={spanish ? 'Cargando' : "Loading"} msgError={spanish ? 'No estas logueado! Logueate para ver los detalles de tu cuenta.' : "You are not logged in! Log in to see your account details."} time={3000}/>
        }
      </div>
  );
}
