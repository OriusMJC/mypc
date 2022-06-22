import { useState } from 'react';
import { getName } from '../redux/actions/index'
import { useAppDispatch } from '../config/config'
import { Link } from 'react-router-dom';
import s from './Styles/SearchBar.module.css'
import NavButtons from './NavButtons';



export default function Searchbar(){
  const dispatch = useAppDispatch();
  const [name, setName] = useState("")

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getName(name));
    setName("")
  }


  return(
    <section className={s.searchBarContainer}>
      <div className={s.contLogo}>
        <Link to = "/"> 
        <h1>logo</h1>
        </Link>
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        <input value={name} type="text" placeholder = " Search Components" onChange = {e => handleInputChange(e)}/>
        <button type="submit">Buscar</button>
      </form>
      <NavButtons/>
    </section>
  )
}