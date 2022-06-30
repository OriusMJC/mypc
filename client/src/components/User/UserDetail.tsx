import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProducts from './UserProducts';
import s from "../Styles/userDetails.module.css";
import Loading from "../Loading/Loading";

export default function UserDetail() {
  const user = useSelector((state: any) => state.userDetails);
  const products = useSelector((state:any) => state.allComponents);
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
                  <p>Password: {user && "***" + user.password?.slice(-3)}</p>
                  <p>Phone: {user && user.phone}</p>
                </div>
                <img src={user && user.avatar} alt={user.name} />
              </div>
              <div className={s.userProducts}>
                <div className={s.productBuyed}>
                  <h2>BUYED</h2>
                  {user.buy.length &&
                    user.buy.map((c) => {
                      return (
                        <ul>
                          <li className={s.li}>BUYED: {c.buy}</li>
                        </ul>
                      );
                    })}
                </div>
                {/* <div>
                  <h2>FAVED</h2>
                  {user.fav.length &&
                    user.fav.map((c) => {
                      return (
                        <ul>
                        <li className={s.productFaved}>
                        <img src={c.photo} alt="" />
                        <div>
                        <h1>{c.title && c.title}</h1>
                        <h3>{c.type}</h3>
                        <h3>{c.price}</h3>
                        </div>
                        </li>
                        </ul>
                      );
                    })}
                </div> */}
              </div>
            </div>
        </>
        :
          <Loading load='Cargando' msgError='No estas logeado! Logeate para ver los detalles de tu cuenta.' time={3000}/>
        }
      </div>
  );
}
