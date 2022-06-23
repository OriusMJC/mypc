import { Link } from "react-router-dom";

export default function HelpSelling(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Vendiendo</h2>
            <Link to={'/selling/publications'}>Publicaciones</Link>
            <Link to={'/selling/sales'}>Ventas, cobros y envíos</Link>
            <Link to={'/selling/charges'}>Cargos de Mercado Libre</Link>
            <Link to={'/selling/reputation'}>Reputación y opiniones</Link>
            <Link to={'/selling/cancellations'}>Qué son las cancelaciones y cómo me afectan</Link>
            <Link to={'/selling/posts'}>Preguntas y respuestas en mis publicaciones</Link>
            <Link to={'/selling/protection'}>Cómo protegemos a los vendedores</Link>
            <Link to={'/selling/observers'}>Quiénes ven mis publicaciones</Link>
        </div>
    )
}