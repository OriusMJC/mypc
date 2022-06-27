import { Link } from "react-router-dom";
import s from "../../Styles/Help.module.css";


export default function CreditMarket(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Mercado Crédito</h2>
        </div>
    )
}