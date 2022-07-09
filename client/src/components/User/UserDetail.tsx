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
              <button>Editar perfil</button>
            </Link>
            <Link to="/user/detail/password">
              <button>Cambiar contraseña</button>
            </Link>
            <Link to="/user/detail/mail">
              <button>Cambiar email</button>
            </Link>
            {/* <button>a</button> */}
          </div>
          <div className={s.userDetails}>
            <div className={s.buttonContainer}>
              <Link to="/">
                <button className={s.buttonButton}>
                  Inicio
                </button>
              </Link>
              <Link to="/user/direction">
                <button className={s.buttonButton}>
                  Dirección
                </button>
              </Link>
              <Link to = "/user/createProduct">
                <button className={s.buttonButton}>
                  Vender
                </button>
              </Link>
              <Link to ='/user/userProducts'>
                <button className={s.buttonButton}> 
                  Estadisticas
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
                  <p>Contraseña: {user && "***" + user.password?.slice(-3)}</p>
                  <p>Teléfono: {user && user.phone}</p>
                </div>
                <img src={user && user.avatar} alt={user.name} />
              </div>
              <div className={s.userProducts}>
                  <h2>COMPRADO</h2>
                  {orders.length ?
                    orders.map((c) => {
                      return (
                        <>
                          <hr></hr>
                          <div className={s.orderCard}>
                            <div>
                              <b>Nro de compra</b>
                              <p>{c.id}</p>
                              <h5>Fecha: {c.date? c.date: null}</h5>
                            </div>
                            <div>
                              <h3>Monto: $ {c.fullPayment}</h3>
                                <Link to={`order/${c.id}`}>
                                  <button>
                                    VER DETALLES
                                  </button>
                                </Link>
                            </div>
                          </div>
                        </>
                      );
                    }) 
                    : 
                    <p>Aún no compraste nada</p>}
              </div>
            </div>
        </>
        :
          <Loading load='Cargando' msgError='No estas logueado! Logueate para ver los detalles de tu cuenta.' time={3000}/>
        }
      </div>
  );
}
