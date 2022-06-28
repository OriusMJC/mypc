import s from './Styles/Contact.module.css';
import { Link } from "react-router-dom";

export default function Contact(){
    return (
        <div className= {s.div}>
            <Link to='/'>
                <button>Página principal</button>
            </Link>
            <h1>Contacta con nosotros</h1>
            <form className= {s.form}
                action='https://formspree.io/f/moqrzyvk'
                method="POST"
            >
                <input 
                    className= {s.input}
                    type='text'
                    placeholder='Tu nombre'
                    required
                />
                <input
                    className={s.input}
                    type='email'
                    placeholder='Email'
                    name="email"
                    required
                />
                <textarea
                    placeholder='Ingresa tu mensaje'
                    name="message"
                    required
                />
                <input
                    className= {s.button}
                    type='submit'
                    value='Enviar'
                />
            </form>
        </div>
    )
}