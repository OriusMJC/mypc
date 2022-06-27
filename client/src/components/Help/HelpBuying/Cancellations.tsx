import { Link } from "react-router-dom";
import s from "../../Styles/Help.module.css";

export default function Cancellations(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Cancelaciones</h2>
            <details>
                <summary>Cómo cancelo una compra</summary>
                <p>Si ya no querés un producto que compraste, sea cual sea el motivo, podés arrepentirte y obtener el reembolso total de tu dinero desde Mis compras.</p>
                <p>Según el estado del envío, tenés que seguir alguno de estos pasos.</p>
                <h4>Si la compra todavía no se despachó, buscá el botón “Cancelar compra”</h4>
                <p>Vas a encontrar el botón en el estado de la compra que ya no querés recibir.</p>
                <p>Si no tenés disponible “Cancelar compra”, elegí Necesito ayuda {'>'} Tengo un problema con el producto {'>'} Quiero cancelar la compra. En ese caso, te pediremos que escribas un mensaje para abrir un reclamo. Si el paquete no se despachó, cancelaremos tu compra.</p>
                <h4>Si la compra ya se despachó, podés rechazarla cuando te llegue o no retirarla del correo</h4>
                <p>Cuando el paquete llegue a tu domicilio, pedile a la persona del reparto que se lo lleve de vuelta. Si el envío es a una sucursal de correo, no vayas a buscar el paquete.</p>
                <h4>Si ya recibiste la compra, devolvela</h4>
                <p>En el estado de la compra, buscá el botón “Devolver o cambiar gratis”. Si no lo tenés disponible, elegí la opción “Quiero devolver o cambiar el producto” en la Ayuda. Podés consultar las políticas de devolución para conocer los plazos de cobertura o el paso a paso sobre cómo devolver un producto.</p>
                <p>Para saber cuándo vas a recibir un reembolso después de cancelar una compra, consultá los tiempos de acreditación de cada medio de pago.</p>
            </details>
            <details>
                <summary>Un vendedor canceló mi compra</summary>
            </details>
            <details>
                <summary>Cuándo recibo el dinero de una compra cancelada</summary>
            </details>
        </div>
    )
}