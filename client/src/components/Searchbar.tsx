import { useState } from 'react';
import { getName } from '../redux/actions/index'
import { useAppDispatch } from '../config/config'
import s from './Styles/SearchBar.module.css'



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
      <form onSubmit={e => handleSubmit(e)}>
        <input value={name} type="text" placeholder = " Search Components" onChange = {e => handleInputChange(e)}/>
        <button type="submit">Buscar</button>
      </form>
    </section>
  )
}