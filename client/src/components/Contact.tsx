import s from './Styles/Contact.module.css';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Contact(){
    const spanish = useSelector((state: any) => state.spanish);
    return (
        <div className={s.contactContainer}>
            <div className= {s.div}>
                <Link to='/'>
                    <button>{spanish ? "Inicio" : "To Home"}</button>
                </Link>
                <h1>{spanish ? "Contacta con nosotros" : "Contact us"}</h1>
                <form className= {s.form}
                    action='https://formspree.io/f/moqrzyvk'
                    method="POST"
                >
                    <input 
                        className= {s.input}
                        type='text'
                        placeholder={spanish ? 'Tu nombre' : "Your name"}
                        required
                    />
                    <input
                        className={s.input}
                        type='email'
                        placeholder={spanish ? 'Tu email' : "Your email"}
                        name="email"
                        required
                    />
                    <textarea
                        placeholder={spanish ? 'Ingresa tu mensaje' : "Enter your message"}
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
        </div>
    )
}
