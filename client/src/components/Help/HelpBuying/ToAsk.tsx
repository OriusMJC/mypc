import { Link } from "react-router-dom";

export default function ToAsk(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Preguntar en una publicación</h2>
        </div>
    )
}