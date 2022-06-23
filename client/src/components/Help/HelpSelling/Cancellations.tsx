import { Link } from "react-router-dom";

export default function Cancellations(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Qué son las cancelaciones y cómo me afectan</h2>
            <p>Consideramos que una venta está cancelada cada vez que el comprador recibe su dinero de vuelta antes de que hayas entregado el producto, sin importar quién pidió la cancelación.</p>
            <h4>Cancelás una venta cuando:</h4>
            <ul>
                <li>Desde el detalle de la venta elegís “Cancelar venta”.</li>
                <li>En tu cuenta de Mercado Pago o desde un reclamo abierto decidís “Devolver dinero”.</li>
            </ul>
            <p>Tené presente que las devoluciones de productos no son consideradas ventas canceladas. </p>
            <h4>¿Cómo me afectan las cancelaciones?</h4>
            <p>Si más del 2,5% de tus ventas están canceladas, tu cuenta podría ser suspendida para vender, tal como lo establecen nuestras políticas.</p>
            <p>Además, las ventas canceladas por vos intencionalmente, afectan tu color en el termómetro de reputación.</p>
            <h4>¿Cómo puedo hacer para evitar las cancelaciones?:</h4>
            <ul>
                <li>Intentá publicar siempre con stock y mantené sincronizado tu inventario entre lo que vendés en Mercado Libre y lo que vendés por otros medios.</li>
                <li>Revisá y actualizá siempre tus publicaciones para que los compradores sepan claramente lo que ofrecés.</li>
                <li>Asegurate de que tus precios estén al día.</li>
            </ul>
            <h4>¿Qué ventas canceladas no me perjudican?</h4>
            <ul>
                <li>Cuando un producto no llega porque el correo tuvo un problema.</li>
                <li>Aquellas ventas que cancelamos por algún inconveniente que no tuvo que ver con vos ni con tu comprador.</li>
            </ul>
            <h4>¿Qué pasa con las cancelaciones de servicios o reservas?</h4>
            <p>Cada vez que se cancele un servicio o reserva de vehículo, tu reputación y tus métricas de ventas canceladas serán afectadas igual que cuando se cancela la venta de un producto.</p>
        </div>
    )
}