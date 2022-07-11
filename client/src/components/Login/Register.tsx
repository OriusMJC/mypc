import { useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { userRegister} from '../../services/userFirebase'
import { useAppDispatch } from '../../config/config'
import { createUser } from '../../redux/actions/index'
import s from '../Styles/Register.module.css';
import validator from 'validator';
import swal from 'sweetalert';
import { useSelector } from "react-redux";

interface User {
  name: string
  email: string
  password: string
  phone: string
}

// function validate(user){
//   let errors: User = {
//     phone: "",
//     name:"",
//     email: "", 
//     password: ""
//   } 
  
//   if(!user.email ){
//       errors.email = '*email required'
//   }else if( !user.password ){
//       errors.password = "*password required"      
//   }  else if(!user.name){
//     errors.name = "*name required"   
//   }  else if(!validator.isEmail(user.email)){
//     errors.email = "*pls enter a valid email like 'example@example.com'" 
//   }
//   return errors;
// }



export default function Register(){
  
 
  const spanish = useSelector((state: any) => state.spanish);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userValidate, setuserValidate] = useState("")
  const [error, setError] = useState<User>({
    phone: "",
    name:"",
    email: "",
    password: ""
  })
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

  function validate(user){
  let errors: User = {
    phone: "",
    name:"",
    email: "", 
    password: ""
  } 
  
  if(!user.email ){
      errors.email = spanish ? "*email es requerido" : "*email required"
  }else if( !user.password ){
      errors.password = spanish ? "*contraseña es requerida" : "*password required"      
  }  else if(!user.name){
    errors.name = spanish ? "*nombre es requerido" : "*name required"   
  }  else if(!validator.isEmail(user.email)){
    errors.email = spanish ? "ingrese un correo electrónico válido como 'ejemplo@ejemplo.com" : "*enter a valid email like 'example@example.com'" 
  }
  return errors;
}

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
    setError(validate({
      ...user,     
      [e.target.name] : e.target.value
  }))
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    try {
      const userData: any = await userRegister(user.email, user.password)
      swal({
        title: spanish ? "Felicidades" : "Congratulations",
        text: spanish ? "Tu perfil fue creado correctamente" : "Your profile was successfully created",
        icon: "success",
      }); 
      dispatch(createUser({
        ...user,
        avatar: user.avatar.length ? user.avatar : AvatarImgDefault,
        id: userData.user.uid
      }));   
      navigate("/login")      
    } catch (error) {
     if(error.code === "auth/email-already-in-use") setuserValidate(spanish ? "El email ya está en uso... por favor, intente con otro" : "Email is already in use... please try another")   
  //  setuserValidate(error.code)
    }
  } 
 const AvatarImgDefault = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
  return (
    <div className={s.formRegisterContainer}>
        {userValidate && <p className={s.error}>{userValidate}</p>}
      <form onSubmit={handleSubmit} className={s.formRegister}>
        <label>Avatar</label>
        <input type="url" name="avatar" value={user.avatar } onChange={handleChange}></input>

        <label>{spanish ? "Nombre de usuario" : "Username"}</label>
         {error.name && (<p className={s.error}> {error.name}</p>)}
        <input  type= "text" required maxLength={20} name="name" value = {user.name} onChange={handleChange}></input>

        <label>{spanish ? "Teléfono" : "Phone"}</label>
        {error.phone && (<p className={s.error}> {error.phone}</p>)}
        <input  type="number"  name="phone" value={user.phone} onChange={handleChange}></input>

        <label>Email</label>
          {error.email && (<p className={s.error}> {error.email}</p>)}
        
        <input type= "email"  required minLength={7} placeholder = {spanish ? "ejemplo@ejemplo.com" : "example@example.com"} name="email" value = {user.email} onChange={handleChange}/>

        <label>{spanish ? "Contraseña" : "Password"}</label>
         {error.password && (<p className={s.error}> {error.password}</p>)}
        <input type="password" required minLength={7} maxLength={12}  placeholder = {spanish ? "Ingrese la contraseña" : "Enter password"} name ="password" value = {user.password} onChange={handleChange}/>

        <button type="submit">{spanish ? "Registrarse" : "Register"}</button>
       
      </form>

      <Link to = "/login">
        <h4 className = {s.haveAccount}>
        {spanish ? "Ya tienes una cuenta?" : "Already have an account?"}
        </h4>
      </Link>
       
    </div>
  )
}