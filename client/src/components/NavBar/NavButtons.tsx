import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { singOutUser } from '../../redux/actions/index';
import s from "../Styles/NavButtons.module.css";

export default function NavButtons() {
  const dispatch = useAppDispatch();
  const user = useSelector((store: any) => store.userDetails);
  let menuShow = useRef(null);
  let menuNoti = useRef(null);

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
  };

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
            {/* <button id='btnNoti'> */}
              <i className="fa-solid fa-bell"></i>
              {/* <i className="fa-solid fa-bell-on"></i> */}
            </button>
            <div id="showNoti" className={s.showNoti}>
              <ul>
                {
                  user.noti?.length?
                    user.noti.map((n:any)=>{
                      console.log(n.url)
                      return(
                        <li>
                          <Link to={n.url? n.url : '/'}>
                            <img src={n.photo?.[0]}/>
                            <div>
                              <h1>{n.title}</h1>
                              <p>{n.msg}</p>
                              <b>{n.date}</b>
                            </div>
                          </Link>
                        </li>
                      )
                    })
                    :
                    <h1>Aún no hay notificaciones</h1>
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
                    <span>Acount</span>
                  </Link>
                </li>
                <li onClick={handleSingOut}>
                  <Link to="/">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Sign Out</span>
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
                    <span>Register</span>
                  </Link>
                </li>
                <li onClick={handleSingOut}>
                  <Link to="/login">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Login</span>
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
