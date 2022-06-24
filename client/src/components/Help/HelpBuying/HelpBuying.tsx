import { Link } from "react-router-dom";
import s from "../../Styles/HelpSelling.module.css"
export default function HelpBuying(){
    return (
        <div className={s.container} >
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>

            <h2>Comprando</h2>

            <Link to={'/buying/buys'}>Compras</Link>
            <Link to={'/buying/returns'}>Devoluciones</Link>
            <Link to={'/buying/changes'}>Cómo funcionan los cambios</Link>
            <Link to={'/buying/cancellations'}>Cancelaciones</Link>
            <Link to={'/buying/opinions'}>Opiniones</Link>
            <Link to={'/buying/toask'}>Preguntar en una publicación</Link>
            <Link to={'/buying/creditmarket'}>Mercado Crédito</Link>
            <Link to={'/buying/subscriptions'}>Suscripciones</Link>
        </div>
    )
}