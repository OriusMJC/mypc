import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProducts from './UserProducts';
import s from "../Styles/userDetails.module.css";

export default function UserDetail() {
  const user = useSelector((state: any) => state.userDetails);
  const products = useSelector((state:any) => state.allComponents);

  return (
    <div className={s.container}>
      <div className={s.button}>
        <Link to="/">
          <button className={s.buttonButton}>
            Go home
          </button>
        </Link>
        <Link to = "/user/createProduct">
          <button className={s.buttonCreate}>
              Create Product
          </button>
        </Link>
        <Link to ='/user/userProducts'>
          <button>
            Created
          </button>
        </Link>
        <Link to = '/user/admin'>
          <button>
            Go admin panel chaval
          </button>
        </Link>
      </div>
      <div className={s.user}>
        <div className={s.userDetails}>
          <h1>{user && user.name}</h1>
          <p>Email: {user && user.email}</p>
          <p>Password: {user && "***" + user.password.slice(-3)}</p>
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
        <div>
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
        </div>
      </div>
    </div>
  );
}
