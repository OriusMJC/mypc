import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {  userLogin, userData } from '../../services/userFirebase'
import { loginUser } from 'src/redux/actions';
import { useAppDispatch } from '../../config/config'
import s from '../Styles/Login.module.css'

export default function Register(){

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    await userLogin(user.email, user.password)
    const id = await userData();
    dispatch(loginUser(id));
    navigate("/");
  }

  return (
    <div className={s.formLoginContainer}>
      <form onSubmit={handleSubmit} className={s.formLogin}>
        <label>Email</label>
        <input type= "email" placeholder = "Enter email" name="email" value = {user.email} onChange={handleChange}/>

        <label>Password</label>
        <input type="password" placeholder = "Enter password" name ="password" value = {user.password} onChange={handleChange}/>

        <button type="submit">Login</button>
      </form>
      <Link to='/user/register'>
        <button>Registrarse</button>
      </Link>
    </div>
  )
}