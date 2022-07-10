import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { deleteNoti, singOutUser, viewedNoti } from '../../redux/actions/index';
import s from "../Styles/NavButtons.module.css";

export default function NavButtons() {
  const spanish = useSelector((state: any) => state.spanish);
  const dispatch = useAppDispatch();
  const user = useSelector((store: any) => store.userDetails);
  const notifications = useSelector((store: any) => store.userDetails?.noti);
  let menuShow = useRef(null);
  let menuNoti = useRef(null);
  let [notiView,setNotiView] = useState(false);
  function handleSingOut(e) {
    dispatch(singOutUser());
    handleShowMenu(e);
  }
  function handleOutMenu(e){
    handleShowMenu(e);
  }
  
  let handleShowMenu = (event) => {
    if (menuShow) {
      menuShow.current.style.display === "block"
      ? (menuShow.current.style.display = "none")
      : (menuShow.current.style.display = "block");
    }
  };

  function handleOutNoti(e){
    handleShowMenu(e);
  }

  let handleShowNoti = (event) => {
    if (menuNoti) {
      menuNoti.current.style.display === "block"
        ? (menuNoti.current.style.display = "none")
        : (menuNoti.current.style.display = "block");
    }
    if(notiView){
      setNotiView(false)
      dispatch(viewedNoti(user.id))
    }
  };

  function handleDeleteNoti(idUser,idNoti){
    dispatch(deleteNoti(idUser,idNoti))
  }
  useEffect(() => {
    menuShow.current = document.getElementById("showMenu");
    menuNoti.current = document.getElementById("showNoti");
  }, [user]);

  if (user && user.name) {
    return (
      <section className={s.navButtons}>
        <div className={s.userButtons}>
          <div className={s.menuNoti}>
            <button onClick={(event) => handleShowNoti(event)}>
              {
                notiView === true? 
                <i className="fa-solid fa-bell">!</i>
                :
                <i className="fa-solid fa-bell"></i>
              }
            </button>
            <div id="showNoti" className={s.showNoti}>
              <ul>
                {
                  notifications?.length?
                  notifications.map((n:any)=>{
                      if(!n.viewed && !notiView){
                        setNotiView(true)
                      }
                      return(
                        <li key={n.id}>
                          <Link to={n.url} onClick={handleShowNoti}>
                            <img src={n.photo}/>
                            <div>
                              <h1>{n.title}</h1>
                              <p>{n.msg}</p>
                              <b>{n.date}</b>
                            </div>
                          </Link>
                          <button onClick={()=>{handleDeleteNoti(user.id,n.id)}}>x</button>
                        </li>
                      )
                    })
                    :
                    <h1>{spanish ? "Aún no hay notificaciones" : "There are no notifications yet"}</h1>
                }
              </ul>
            </div>
          </div>
          <Link to="/fav">
            <button>
              <i className="fa-solid fa-heart"></i>
            </button>
          </Link>
          <Link to="/cart">
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </Link>
          <div className={s.menuUser}>
            <button onClick={(event) => handleShowMenu(event)}>
              <i className="fa-solid fa-circle-user"></i>
            </button>
            <div id="showMenu" className={s.showMenu}>
              <ul>
                <li onClick={handleShowMenu}>
                  <Link to="/user/detail">
                    <i className="fa-solid fa-user"></i>
                    <span>{spanish ? "Cuenta" : "Acount"}</span>
                  </Link>
                </li>
                <li onClick={handleSingOut}>
                  <Link to="/">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>{spanish ? "Salir" : "Sign Out"}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className={s.navButtons}>
        <div id={s.userButtons}>
          <Link to="/fav">
            <button>
              <i className="fa-solid fa-heart"></i>
            </button>
          </Link>
          <Link to="/cart">
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </Link>
          <div className={s.menuUser}>
            <button onClick={(event) => handleShowMenu(event)}>
              <i className="fa-solid fa-circle-user"></i>
            </button>
            <div id="showMenu" className={s.showMenu}>
              <ul>
                <li onClick={handleOutMenu}>
                  <Link to="/register">
                    <i className="fa-solid fa-address-card"></i>
                    <span>{spanish ? "Registrarse" : "Register"}</span>
                  </Link>
                </li>
                <li onClick={handleSingOut}>
                  <Link to="/login">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>{spanish ? "Ingresar" : "Login"}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
