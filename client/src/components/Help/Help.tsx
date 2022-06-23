import { Link } from "react-router-dom";

export default function Help(){
    return (
        <div>
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
        </div>
    )
}