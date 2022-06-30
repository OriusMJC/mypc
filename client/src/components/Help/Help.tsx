import { Link ,  Outlet} from "react-router-dom";
import s from "../Styles/Help.module.css";
export default function Help(){
    return (
        <div className={s.container} >
            <h2>¿Con qué podemos ayudarte?</h2>
            <div>
                <Link to='/help/buying'>Comprando</Link>
            </div>
            <div>
                <Link to='/help/selling'>Vendiendo</Link>
            </div>
            <div>
                <Link to='/help/faq'>Preguntas frecuentes</Link>
            </div>
            < Outlet/>
        </div>
    )
}