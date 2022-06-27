import { useState } from "react";
import { getName, getAllComponents } from "../../redux/actions/index";
import { useAppDispatch } from "../../config/config";
import { Link, useNavigate } from "react-router-dom";
import s from "../Styles/NavBar.module.css";
import NavButtons from "./NavButtons";
import { useSelector } from "react-redux";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getName(name));
    setName("");
  }

  function handleRefresh(e){
    dispatch(getAllComponents());
    navigate('/')
  }

  return (
    <nav className={s.searchBarContainer}>
      <div className={s.contain}>
        <div className={s.contLogo}>
          <button onClick = {handleRefresh} className = {s.logo}>
            MyPC
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={s.searchBar}>
          <input
            value={name}
            type="text"
            placeholder=" Search Components"
            onChange={(e) => handleInputChange(e)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <NavButtons />
      </div>
    </nav>
  );
}
