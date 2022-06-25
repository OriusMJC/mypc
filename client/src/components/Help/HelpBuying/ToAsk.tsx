import { Link } from "react-router-dom";
import s from "../../Styles/Help.module.css";


export default function ToAsk(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Preguntar en una publicación</h2>
        </div>
    )
}