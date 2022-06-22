import { useState } from 'react';
import { getName } from '../../redux/actions/index'
import { useAppDispatch } from '../../config/config'
import s from '../Styles/SearchBar.module.css'



export default function Searchbar() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("")

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getName(name));
    setName("")
  }


  return (
    <section className={s.searchBarContainer}>
      <form onSubmit={e => handleSubmit(e)}>
        <input value={name} type="text" placeholder=" Search Components" onChange={e => handleInputChange(e)} />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </section>
  )
}