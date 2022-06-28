import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {  userLogin, userData, signInWithGoogle } from '../../services/userFirebase'
import { createUser, getUserData, loginUser } from '../../redux/actions';
import { useAppDispatch } from '../../config/config'
import s from "../Styles/Login.module.css";
import validator from 'validator';
import { useSelector } from 'react-redux';



interface User {
  email: string
  password: string
}

function validate(user){
  let errors: User = {
    email: "",
    password: ""
  } 
  if(!user.email ){
      errors.email = '*email required'     
  }else if( !validator.isEmail(user.email) ){
      errors.email = "*use a valid email like 'example@example.com'"      
    
  }else if( !user.password ){
      errors.password = "*password required"      
  }  else if( !validator.isLowercase(user.password) ){
    errors.password = "*password must be 'lowercase'"      
}  
  return errors;
}

export default function Login(){

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userValidate, setuserValidate] = useState("")
  const [errors, setErrors] = useState<User>({
    email: "",
    password: "",
  })
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...user,
      [e.target.name] : e.target.value
  }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    try {
      await userLogin(user.email, user.password)
      const id = await userData();   
        dispatch(loginUser(id));
        navigate("/");              
    } catch (error) {
      if(error.code === "auth/user-not-found") setuserValidate("User Invalid")   
       if(error.code === "auth/wrong-password") setuserValidate("Password invalid")   
      // setuserValidate(error.code)  
    }
  }
  
  async function handleSignInGoogle () {
    let data = await signInWithGoogle()
    let res = await dispatch(getUserData(data.uid))
    await dispatch(loginUser(data.uid))
    if(!res.id){
      await dispatch(createUser({
          id:data.uid,
          name:data.displayName,
          email: data.email,
          password: '1234567',
          phone: data.phoneNumber? data.phoneNumber : '1111111111',
          avatar: data.photoURL,
          buy: [],
          fav: []
        }))
        dispatch(loginUser(data.uid))
    }
  }

  return (
    <div className={s.formLoginContainer}>
      {userValidate && <p>{userValidate}</p>}
      <form onSubmit={handleSubmit} className={s.formLogin}>
        <label>Email</label>
        <input type= "email"  required minLength={7} placeholder = "example@example.com" name="email" value ={user.email} onChange={handleChange}/>
        

        <label>Password</label>
        <input type="password" required minLength={6} maxLength={12} placeholder = "Enter password" name ="password" value = {user.password} onChange={handleChange}/>
        {/* Regex para validar password.  */}
        {/* pattern='^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$' 
          ^.*              : Start
          (?=.{6,12})      : Length min=6 max=12
          (?=.*[a-zA-Z])   : Letters
          (?=.*\d)         : Digits
          (?=.*[!#$%&? "]) : Special characters
          .*$              : End
        */}
        <button type="submit">Login</button>
          <span>Don't have account?</span>
        <Link to='/user/register'>
          <button>Registrarse</button>
        </Link>
        <button onClick={handleSignInGoogle}>Sign In With Google</button>
      </form>
      {errors.email && (<p className={s.error}> {errors.email}</p>)}
      {errors.password && (<p className={s.error}> {errors.password}</p>)}
    </div>
  )
}