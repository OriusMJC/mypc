import { Link } from "react-router-dom";
import s from "../../Styles/Help.module.css";

export default function Observers(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Quiénes ven mis publicaciones</h2>
            <h4>Si tus publicaciones están activas, las verán todos los compradores.</h4>
            <p>En caso de que seas un vendedor con reputación roja o sin ventas suficientes como para tener reputación, tus publicaciones las verán solamente compradores que tengan experiencia en el sitio. Esto te ayudará a gestionar rápido tus ventas, vender más y conseguir una buena reputación.</p>
            <p>Podés ver cómo te ven tus compradores en la sección de Reputación.</p>
        </div>
    )
}