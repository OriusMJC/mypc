import { Link } from "react-router-dom";

export default function Opinions(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Opiniones</h2>
            <h4>Cómo y cuándo opinar sobre el vendedor</h4>
            <p>Una vez que tengas tu producto podrás dejar un comentario sobre el vendedor, que mostraremos en su perfil. La forma de hacerlo dependerá de cómo hayas recibido tu producto:</p>
            <h4>Por Mercado Envíos</h4>
            <p>Encontrarás la acción Opinar sobre el vendedor en el menú de acciones, en tu listado de Compras.</p>
            <h4>Entrega con acuerdo</h4>
            <p>Si el vendedor te lo entregó personalmente, o usó una forma de envío propia, te enviaremos un e-mail para asegurarnos que recibiste el producto correctamente. Luego de que nos confirmes, podrás dejar tu comentario y contar tu experiencia.</p>
        </div>
    )
}