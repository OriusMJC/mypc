import { useState } from 'react';
import { getName } from '../redux/actions/index'
import { useAppDispatch } from '../config/config'



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
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input value={name} type="text" placeholder = " Search Components" onChange = {e => handleInputChange(e)}/>
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}