import { Link } from 'react-router-dom';
import Contact from './Contact'
import s from './Styles/Footer.module.css'


function Footer() {
  return (
    <div className = {s.container}>
        <Link to = "/contact">
            <Contact/>
        </Link>
        LOGO
    </div>
  )
}

export default Footer