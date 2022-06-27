import { Link } from "react-router-dom";
import s from '../../Styles/Faq.module.css'

export default function Faq(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>

            <h2>Preguntas Frecuentes</h2>

            <details>
                <summary>Realizar un pedido</summary>
                <h3>¿Cómo realizo un pedido?</h3>
                <p>Solo tenés que seleccionar todos los productos que deseas adquirir. Seguidamente, en el carrito de compras, para conocer el costo del envío colocás tu código postal en el recuadro correspondiente, elegís la mensajería de tu preferencia y debajo seleccionas la forma de pago. Luego hacés clic en el botón COMPRAR y podés acceder como cliente (si ya tenés cuenta en Compra Gamer) o crear un cliente nuevo. Por último, completás los pasos brindados por el asistente, hasta confirmar la compra. Se te asignará un número de pedido y se mostrarán los datos del mismo. También enviaremos un mail a tu correo electrónico registrado con los detalles del pedido realizado.</p>
            </details>
            <details>
                <summary>Precio</summary>
                <h3>¿El precio que figura en la web es el precio final?</h3>
                <p>Todos los precios en la web incluyen el IVA, y se encuentran expresados en pesos argentinos.</p>
            </details>
            <details>
                <summary>Depósito - Transferencia bancaria</summary>
                <h3>¿Cómo abono a través de depósito/transferencia?</h3>
                <p>Una vez se realiza el pedido, te facilitamos los datos del CBU. Debes abonar e informar el pago desde nuestra web, antes de la fecha de vencimiento de la reserva.</p>
            </details>
            <details>
                <summary>Pago Gamer</summary>
                <h3>¿Qué es Pago Gamer?</h3>
                <p>Es un método exclusivo de Compra Gamer, para abonar de manera online a través de tarjetas Visa y Mastercard, con el cual podés acceder a 3 y 12 cuotas sin interés si empleas una tarjeta de crédito brindada por una entidad bancaria.</p>
            </details>
            <details>
                <summary>Mercadopago</summary>
                <h3>¿Cómo puedo abonar a través de MercadoPago?</h3>
                <p>Podés hacerlo de tres formas: Con tarjetas online en cuotas (no se puede acceder a cuotas sin interés); A través de RapiPago/ PagoFácil (se abona al precio de lista, pero no se pueden hacer cuotas, sólo se puede abonar en un pago); y realizando una transferencia desde tu cuenta de MercadoPago.</p>
            </details>
            <details>
                <summary>Envíos</summary>
                <h3>¿Cómo gestiono el envío de mi pedido?</h3>
                <p>En primer lugar, para conocer el costo del envío, una vez le agregues al carrito tu compra, solo debes colocar tu código postal en el recuadro correspondiente, seleccionar la mensajería de tu preferencia y elegir si deseas el retiro en alguna sucursal o la entrega a domicilio. Actualmente realizamos envíos a todo el país través de Oca y Andreani; y si te encontrás en CABA o alrededores, podrás seleccionar el servicio de Mensajería Privada que es exclusivo de Compra Gamer. Tené en cuenta que, para calcular el costo del envío, se toman en consideración tanto las dimensiones y peso del paquete como la distancia de la localidad de entrega.</p>
            </details>
            <details>
                <summary>Facturación</summary>
                <h3>¿Cómo tramito la factura de mi compra?</h3>
                <p>En todas las compras efectuadas en la web, brindamos sin excepción alguna, la factura de compra. Una vez que realiza y abona el pedido, enviamos a tu dirección de correo electrónico la factura correspondiente. Por supuesto, también podés descargarla desde la sección Mi cuenta "{'->'}" Mis facturas. En caso de que precises factura A, solo debes ingresar tu CUIT al cargar el pedido por la web. Tené en cuenta que la factura A puede tener percepciones.</p>
            </details>
            <details>
                <summary>Garantías</summary>
                <h3>¿Cómo utilizo el servicio de PosVenta y garantías?</h3>
                <p>Para realizar consultas/reclamos relacionadas con la garantía o devolución de alguna de tus compras, al final de esta sección contamos con el apartado “Compra Gamer te ayuda. ¿Cuál es tu consulta?” donde debes exponer tu caso, seleccionando el motivo de “Posventa” que se adapte a tu requerimiento y uno de nuestros representantes te ofrecerá la información correspondiente sobre cómo proceder. En caso de preferir venir a la empresa a gestionar un tema de PosVenta o garantía, podés hacerlo sacando un turno haciendo clic ACÁ</p>
            </details>
        </div>
    )
}