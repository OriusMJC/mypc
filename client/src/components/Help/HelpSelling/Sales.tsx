import { Link } from "react-router-dom";

export default function Sales(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Ventas, cobros y envíos</h2>
            <details>
                <summary>Cómo vender de manera segura</summary>
                <h4>¿Hiciste una venta? Te explicamos las 3 maneras en que podés corroborar que se efectuó correctamente. Esto te ayudará a evitar posibles estafas. </h4>
                <ol>
                    <li>Desde tu cuenta de Mercado Libre</li>
                    <p>La venta tiene que aparecer en la sección de Ventas. Allí también podrás ver el estado de cada una de ellas y los pasos a seguir en caso de envío.</p>
                    <li>Desde tu cuenta de Mercado Pago</li>
                    <p>Deberás ver la transacción ingresando en tu actividad.</p>
                    <li>Desde tu correo electrónico</li>
                    <p>Recibirás un e-mail de aviso con los detalles de la venta. Verificá que recibiste este correo y asegurate que la dirección que lo envía sea @mercadolibre.com o @mercadopago.com. Ver Creo que recibí un e-mail falso</p>
                </ol>
            </details>
            <details>
                <summary>Cómo cobrar con cada medio de pago</summary>
            </details>
            <details>
                <summary>Cómo ofrecer un descuento</summary>
            </details>
            <details>
                <summary>Cómo entregar o enviar el producto</summary>
            </details>
            <details>
                <summary>Cómo funciona el panel de ventas</summary>
            </details>
            <details>
                <summary>Si recibo el pago de una venta, ¿cuánto tiempo tengo que esperar para usar el dinero?</summary>
            </details>
            <details>
                <summary>Resolver un problema con una venta, cobro o envío</summary>
            </details>
            <details>
                <summary>Retiré el dinero, pero no está en mi cuenta bancaria</summary>
                <p>Lo primero que puedes hacer es chequear la fecha en que pediste el retiro, ten en cuenta que demora hasta 1 día hábil en acreditarse.</p>
                <p>Si ya pasó el plazo de acreditación, busca en tu estado de cuenta por fecha o por el importe exacto. También puedes buscar por el código de retiro que te enviamos en el e-mail de confirmación. ¡Con ese dato seguro lo encuentras!</p>
                <p>En el caso de que hubiera un error o alguno de los datos de la transferencia es incorrecto, el banco rechaza la acreditación del dinero, regresamos el monto completo a tu cuenta de Mercado Pago y te enviamos un e-mail contándote el motivo.</p>
                <p>Si aún no puedes verlo, en el Detalle de actividad de la operación tienes un botón de Necesito Ayuda.</p>
            </details>                                                                        
        </div>
    )
}