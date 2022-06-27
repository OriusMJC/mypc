import { Link } from "react-router-dom";
import s from "../../Styles/Help.module.css";

export default function Charges(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Cargos de Mercado Libre</h2>
            <details>
                <summary>Cargos por vender un producto</summary>
                <p>Publicar en nuestra plataforma es gratis, solo pagás cuando la venta ya esté concretada en algunos tipos de publicación.</p>
                <p>Cada vez que publicás un producto, podés elegir si lo ofrecés en Mercado Libre, Mercado Shops o en ambos canales y así llegar a más compradores.</p>
                <p>Conocé las características y costos de cada canal para saber cómo planificar tu estrategia de venta.</p>
                <h4>Publicar en Mercado Libre</h4>
                <p>Vender en Mercado Libre te permite alcanzar a millones de compradores, tener tráfico permanente en tus publicaciones y ofrecer envíos rápidos. Antes de publicar, tené en cuenta que:</p>
                <ul>
                    <li>El precio de tu producto tiene que ser igual o superior a $ 99. Esto te permitirá cubrir los costos de la venta.</li>
                    <li>Para vender productos de menos de $ 99, te sugerimos armar publicaciones nuevas ofreciendo packs de varias unidades.</li>
                </ul>
            </details>
        </div>
    )
}