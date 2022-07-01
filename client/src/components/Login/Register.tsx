import { useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { userRegister} from '../../services/userFirebase'
import { useAppDispatch } from '../../config/config'
import { createUser } from '../../redux/actions/index'
import s from '../Styles/Register.module.css';
import validator from 'validator';
import swal from 'sweetalert';

interface User {
  name: string
  email: string
  password: string
 phone: string
}

function validate(user){
  let errors: User = {
   phone: "",
    name:"",
    email: "",
    password: ""
  } 
  
  if(!user.email ){
      errors.email = '*email required'
  }else if( !user.password ){
      errors.password = "*password required"      
  }  else if(!user.name){
    errors.name = "*name required"   
  }  else if(!validator.isEmail(user.email)){
    errors.email = "*pls enter a valid email like 'example@example.com'" 
  }
  return errors;
}



export default function Register(){
  
 
    
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
      dispatch(createUser({
        ...user,
        avatar: user.avatar.length ? user.avatar : AvatarImgDefault,
        id: userData.user.uid
      }));
      swal({
        title: "Felicidades",
        text: "Tu perfil fue creado correctamente",
        icon: "success",
      }); 
      navigate("/login")      
    } catch (error) {
     if(error.code === "auth/email-already-in-use") setuserValidate("Email already in use.. pls try another")   
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

        <label>Username</label>
         {error.name && (<p className={s.error}> {error.name}</p>)}
        <input  type= "text" required maxLength={20} name="name" value = {user.name} onChange={handleChange}></input>

        <label>Phone</label>
        {error.phone && (<p className={s.error}> {error.phone}</p>)}
        <input  type="number"  name="phone" value={user.phone} onChange={handleChange}></input>

        <label>Email</label>
          {error.email && (<p className={s.error}> {error.email}</p>)}
        
        <input type= "email"  required minLength={7} placeholder = "example@example" name="email" value = {user.email} onChange={handleChange}/>

        <label>Password</label>
         {error.password && (<p className={s.error}> {error.password}</p>)}
        <input type="password" required minLength={6} maxLength={12}  placeholder = "Enter password" name ="password" value = {user.password} onChange={handleChange}/>

        <button type="submit">Register</button>
       
      </form>

      <Link to = "/login">
        <h4 className = {s.haveAccount}>
        Already have an account?
        </h4>
      </Link>
       
    </div>
  )
}