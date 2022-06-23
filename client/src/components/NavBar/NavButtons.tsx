import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { singOutUser } from "src/redux/actions";
import s from "../Styles/NavButtons.module.css";

export default function NavButtons() {
  const dispatch = useAppDispatch();
  const user = useSelector((store: any) => store.userDetails);
  let menuShow

  function handleSingOut() {
    dispatch(singOutUser());
  }

  let handleShowMenu = (event) => {
    // console.log(menuShow.style.display)
    console.log(menuShow)
    if (menuShow) {
      menuShow.style.display === "block"
        ? (menuShow.style.display = "none")
        : (menuShow.style.display = "block");
    }
  };

  useEffect(() => {
    menuShow = document.getElementById("showMenu");
    // setMenuShow(aux)
  }, [user]);

  if (user.name) {
    return (
      <section className={s.navButtons}>
        <div className={s.userButtons}>
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
            {/* <div className="button" onClick={(event) => handleShowMenu(event)}> */}
            <button onClick={(event) => handleShowMenu(event)}>
              <i className="fa-solid fa-circle-user"></i>
            </button>
            {/* </div> */}
            <div id="showMenu" className={s.showMenu}>
              <ul>
                <li>
                  <Link to="/userdetail">
                    <i className="fa-solid fa-user"></i>
                    <span>Acount</span>
                  </Link>
                </li>
                <li onClick={handleSingOut}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Sign Out</span>
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
          {/* {!user?.name ? ( */}
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
          <Link to="/user/register">
            <button>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </Link>
          {/* ) : (
            <></>
          )}
          {user?.name ? (
            <button onClick={handleSingOut}>Sing Out</button>
          ) : (
            <Link to="/user/login">
              <button>Login</button>
            </Link>
          )} */}
        </div>
      </section>
    );
  }

  //   return (
  //     <section className={s.navButtons}>
  //       <div className={s.userButtons}>
  //         <Link to="/fav">
  //           <button>
  //             <i className="fa-solid fa-heart"></i>
  //           </button>
  //         </Link>
  //         <Link to="/cart">
  //           <button>
  //             <i className="fa-solid fa-cart-shopping"></i>
  //           </button>
  //         </Link>
  //         <Link to="/userdetail">
  //           <button>
  //             <i className="fa-solid fa-circle-user"></i>
  //           </button>
  //         </Link>
  //       </div>
  //       <div id={s.buttonsLogins}>
  //         {!user?.name ? (
  //           <Link to="/user/register">
  //             <button>Register</button>
  //           </Link>
  //         ) : (
  //           <></>
  //         )}
  //         {user?.name ? (
  //           <button onClick={handleSingOut}>Sing Out</button>
  //         ) : (
  //           <Link to="/user/login">
  //             <button>Login</button>
  //           </Link>
  //         )}
  //       </div>
  //     </section>
  //   );
}
