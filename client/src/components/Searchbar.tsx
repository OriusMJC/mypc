import { useState } from 'react';
import { getName } from '../redux/actions/index'
import { useAppDispatch } from '../config/config'

type SearchBar = string

export default function Searchbar(){
  const dispatch = useAppDispatch();
  const [name, setName] = useState<SearchBar>("")

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
  }

  function handleSubmit(e){
    dispatch(getName(name));
    setName("")
  }


  return(
    <div>
      <input type="text" placeholder = " Search Components" onChange = {e => handleInputChange(e)}/>
      <button type="submit" onClick={e => handleSubmit(e)}></button>
    </div>
  )
}