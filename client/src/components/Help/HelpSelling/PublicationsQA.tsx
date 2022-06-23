import { Link } from "react-router-dom";

export default function PublicationsQA(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Preguntas y respuestas en mis publicaciones</h2>
            <details>
                <summary>¿Qué consejos debo seguir para responder preguntas en mis publicaciones?</summary>
            </details>
            <details>
                <summary>¿Puedo cambiar una respuesta que le di al comprador?</summary>
            </details>
            <details>
                <summary>¿Qué puedo hacer si borraron mi respuesta por error?</summary>
            </details>
            <details>
                <summary>¿Puedo borrar una pregunta que me hicieron?</summary>
            </details>
            <details>
                <summary>¿Por qué no puedo responder una pregunta?</summary>
            </details>
        </div>
    )
}