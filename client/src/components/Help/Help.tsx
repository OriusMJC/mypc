import { useSelector } from "react-redux";
import { Link ,  Outlet} from "react-router-dom";
import s from "../Styles/Help.module.css";
export default function Help(){
    const spanish = useSelector((state: any) => state.spanish);
    return (
        <div className={s.container} >
            <h2>{spanish ? "¿Con qué podemos ayudarte?" : "What can we help you with?"}</h2>
            <div>
                <Link to='/help/buying'>{spanish ? "Comprando" : "Buying"}</Link>
            </div>
            <div>
                <Link to='/help/selling'>{spanish ? "Vendiendo" : "Selling"}</Link>
            </div>
            <div>
                <Link to='/help/faq'>{spanish ? "Preguntas frecuentes" : "Frequently asked questions"}</Link>
            </div>
            < Outlet/>
        </div>
    )
}