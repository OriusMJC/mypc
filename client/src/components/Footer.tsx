import { Link } from 'react-router-dom';
import Contact from './Contact'
import s from './Styles/Footer.module.css'
import logo from '../media/logo1.png'




function Footer() {
  return (
    <div className = {s.container}>
        <Link to = "/contact" className = {s.contact}>
            Contactanos!
        </Link>
        <p>
         Necesitas alguna <Link to = "/help" className={s.help}>Ayuda?</Link>  
        </p>        
        <p>Powered by ©My-Pc</p>
        <img src = {logo} width="60px" height="60px"></img>
    </div>
  )
}

export default Footer