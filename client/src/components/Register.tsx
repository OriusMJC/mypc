import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { userRegister, userLogin} from '../services/userFirebase'
import { useAppDispatch } from '../config/config'
import { createUser } from '../redux/actions/index'
import s from './Styles/Register.module.css'

export default function Register(){

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    avatar: "",
    name: "",
    phone: "",
    fav: [],
    buy: [],
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const userData: any = await userRegister(user.email, user.password)
    dispatch(createUser({
      ...user,
      id: userData.user.uid
    }));
    alert("User created successfully");
    navigate("/user/login")
  } 

  return (
    <div className={s.formRegisterContainer}>
      <form onSubmit={handleSubmit} className={s.formRegister}>
        <label>Avatar</label>
        <input type="url" name="avatar" value={user.avatar} onChange={handleChange}></input>

        <label>Username</label>
        <input type= "text" name="name" value = {user.name} onChange={handleChange}></input>

        <label>Phone</label>
        <input type= "text" name="phone" value = {user.phone} onChange={handleChange}></input>

        <label>Email</label>
        <input type= "email" placeholder = "Enter email" name="email" value = {user.email} onChange={handleChange}/>

        <label>Password</label>
        <input type="password" placeholder = "Enter password" name ="password" value = {user.password} onChange={handleChange}/>

        <button type="submit">Create</button>
      </form>
      <Link to = "/user/login">
        Ya tengo cuenta
      </Link>
    </div>
  )
}